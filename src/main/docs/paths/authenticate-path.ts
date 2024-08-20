export const authenticatePath = {
    post: {
      security: [
        {
          bearerAuth: []
        }
      ],
      tags: ['Users'],
      summary: 'API para autenticar um Usuário',
      description:
        'Essa rota só pode ser executada por **usuários autenticados**',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/authUser'
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
    }
  }