import paths from './paths'
import components from './components'
import schemas from './schemas'
import { API } from '@/utils/constants'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Backend Projeto MyWalletDreamer',
    description: 'Ambiente Backend do Projeto',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Mesquita',
      email: 'guirozmesquita@gmail.com',
      url: 'https://www.linkedin.com/in/guilhermesquita'
    }
  },
  servers: [
    {
      url: API,
      description: 'Servidor Principal'
    }
  ],
  tags: [
    {
      name: 'Users',
      description: 'APIs relacionadas ao Controle de Usuários'
    },
    {
      name: 'Movies',
      description: 'APIs relacionadas ao Controle de Filmes'
    }
  ],
  paths,
  schemas,
  components
}
