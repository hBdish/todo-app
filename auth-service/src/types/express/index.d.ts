import { UserSchema } from '../../models/user-model.js'

declare namespace Express {
  export interface Request {
    user: UserSchema | undefined
  }
}
