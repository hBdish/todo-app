import { ErrorApi, ErrorNext } from '../middlewares/types/error-middleware-types.js'

class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors: ErrorApi = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message: string, errors: ErrorApi = []) {
    return new ApiError(400, message, errors)
  }
}

export { ApiError }
