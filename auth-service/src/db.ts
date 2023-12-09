import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  `postgres://${process.env.DATEBASE_USER}:${process.env.DATEBASE_PASSWORD}@${process.env.DATEBASE_HOST}:${process.env.DATEBASE_PORT}/${process.env.DATEBASE_NAME}`,
  {
    dialect: 'postgres',
  },
)

export { sequelize }
