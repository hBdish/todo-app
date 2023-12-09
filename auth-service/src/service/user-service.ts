import { UserModel } from '../models/relationships-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import MailService from './mail-service.js'
import TokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'
import { ApiError } from '../exceptions/api-error.js'
import tokenService from './token-service.js'
import { UserSchema } from '../models/user-model.js'

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({
      where: {
        email,
      },
    })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с таким email уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, isActivated: false, activationLink })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/v1/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(email: string, password: string) {
    const candidate = await UserModel.findOne({
      where: {
        email,
      },
    })

    if (!candidate) {
      throw ApiError.BadRequest(`Пользователь с таким email не существует`)
    }

    const isPassEquals = await bcrypt.compare(password, candidate.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`)
    }

    const userDto = new UserDto(candidate)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(candidate.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({
      where: {
        activationLink,
      },
    })

    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken) as UserSchema
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const candidate = await UserModel.findOne({
      where: {
        id: userData.id,
      },
    })

    if (!candidate) {
      throw ApiError.BadRequest('Пользователь не найден')
    }

    const userDto = new UserDto(candidate)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(candidate.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

export default new UserService()
