import { HttpResponse } from '@/application/contracts'
import { UnauthorizedError } from '@/application/errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  message: 'Request com sintaxe errada',
  body: error.message
})

export const conflict = (resource?: string): HttpResponse => ({
  statusCode: 409,
  message: resource ? `${resource} já cadastrado` : 'Recurso já cadastrado'
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  message: 'Não autorizado',
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  message: 'Autorização negada',
  body: error.message
})

export const notAcceptable = (error: string): HttpResponse => ({
  statusCode: 406,
  message: 'Algo não encontrado',
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  message: 'Erro Interno no Servidor',
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  message: 'Sucesso',
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  message: 'Criado com sucesso',
  body: data
})

export const noContent = (message?: string): HttpResponse => ({
  statusCode: 204,
  message: message ?? 'Nenhum conteúdo encontrado'
})
