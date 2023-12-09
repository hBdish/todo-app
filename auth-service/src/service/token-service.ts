import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/relationships-model.js'
import { UserDtoType } from '../dtos/user-dto.js'

class TokenService {
  generateTokens(payload: UserDtoType) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: { UserId: userId },
    })

    if (!!tokenData) {
      await TokenModel.update(
        {
          refreshToken,
        },
        {
          where: {
            UserId: userId,
          },
        },
      )

      return tokenData
    }

    const token = await TokenModel.create({
      UserId: userId,
      refreshToken,
    })

    return token
  }

  async removeToken(refreshToken: string) {
    const token = await TokenModel.destroy({
      where: {
        refreshToken,
      },
    })
    return token
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: {
        refreshToken,
      },
    })
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
      return userData
    } catch (e) {
      return null
    }
  }
}

export default new TokenService()
