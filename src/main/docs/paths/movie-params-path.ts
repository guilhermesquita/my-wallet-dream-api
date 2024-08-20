export const movieParamsPath = {
  get: {
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: ['Movies'],
    summary: 'API para listar uma paginação de Filmes',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Id do Filme',
        schema: {
          type: 'string',
        }
      }
    ],
    responses: {
      200: {
        description: 'string'
      },
      204: {
        description: 'Sem dados para exibir'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}