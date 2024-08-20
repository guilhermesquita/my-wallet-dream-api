export const moviePath = {
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
    // parameters: [
    //   {
    //     in: 'query',
    //     name: 'pageNumber',
    //     description: 'Número da Página',
    //     schema: {
    //       type: 'number'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'size',
    //     description: 'Quantidade de itens por página',
    //     schema: {
    //       type: 'number'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'orderBy',
    //     description: 'Ordenar por qual campo?',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'order',
    //     description: 'Tipo de ordenação (ASC ou DESC)',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'email',
    //     description: 'Filtro por email do usuário',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'name',
    //     description: 'Filtro por nome de usuário',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'created_at_start',
    //     description: 'Filtro por data de criação inicial',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    //   {
    //     in: 'query',
    //     name: 'created_at_end',
    //     description: 'Filtro por data de criação final',
    //     schema: {
    //       type: 'string'
    //     }
    //   },
    // ],
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