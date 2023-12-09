import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize'
import { CreationOptional } from 'sequelize'
import { sequelize } from '../db.js'

export interface UserSchema extends Model<InferAttributes<UserSchema>, InferCreationAttributes<UserSchema>> {
  id: CreationOptional<number>
  email: string
  password: string
  isActivated: boolean
  activationLink: CreationOptional<string>
}

const UserModel = sequelize.define<UserSchema>('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activationLink: {
    type: DataTypes.STRING,
  },
})

export { UserModel }
