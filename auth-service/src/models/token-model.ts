import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../db.js'

interface TokenSchema extends Model<InferAttributes<TokenSchema>, InferCreationAttributes<TokenSchema>> {
  id: CreationOptional<number>
  UserId: CreationOptional<number>
  refreshToken: string
}

const TokenModel = sequelize.define<TokenSchema>('Token', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  refreshToken: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
})

export { TokenModel }
