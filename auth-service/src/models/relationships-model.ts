import { UserModel } from './user-model.js'
import { TokenModel } from './token-model.js'

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

export { UserModel, TokenModel }
