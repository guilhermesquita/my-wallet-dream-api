export const userParamsPath = {
  get: {
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: ['Users'],
    summary: 'API para listar um Usuário por ID',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'ID do usuário a ser respondida',
        required: true,
        schema: {
          type: 'number'
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
  },
  put: {
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: ['Users'],
    summary: 'API para editar um Usuário por ID',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'ID do usuário a ser respondida',
        required: true,
        schema: {
          type: 'number'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/editUser'
          }
        }
      }
    },
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
  },
  delete: {
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: ['Users'],
    summary: 'API para remover um Usuário por ID',
    description:
      'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'ID do usuário a ser respondida',
        required: true,
        schema: {
          type: 'number'
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
  },
}