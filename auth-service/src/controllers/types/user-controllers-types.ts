import express from 'express'
import * as core from 'express-serve-static-core'

export interface RegistrationRequest extends express.Request {
  body: {
    email: string
    password: string
  }
}

export interface LoginRequest extends RegistrationRequest {}

export interface ActivateRequestParams extends core.ParamsDictionary {
  link: string
}

export interface LogoutRequest extends express.Request {
  cookies: {
    refreshToken: string
  }
}

export interface RefreshRequest extends express.Request {
  cookies: {
    refreshToken: string
  }
}
