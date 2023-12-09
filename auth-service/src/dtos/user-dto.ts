import { UserSchema } from '../models/user-model.js'

export interface UserDtoType {
  id: number
  email: string
  isActivated: boolean
}

class UserDto {
  id: number
  email: string
  isActivated: boolean

  constructor(model: UserDtoType) {
    this.id = model.id
    this.email = model.email
    this.isActivated = model.isActivated
  }
}

export { UserDto }
