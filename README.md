## Api MyWalletDream

generate Hash
```ts
export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
				private tokenManager: TokenManager,
				private hashManager: HashManager
    ) {}
    
    public signup = async (
			input: CreateUserInputDTO
		): Promise<CreateUserOutputDTO> => {
        
				// validações de regra de negócio
				
				// geração da id
        const id = this.idGenerator.generate()

				// hash gerado a partir da senha do body
				const hashedPassword = await this.hashManager.hash(password)

        // imaginando q User tem id, name, email, password e createdAt
        const newUser = new User(
            id,
            input.email,
            hashedPassword, // usamos a senha hasheada em vez da senha plaintext
            new Date().toISOString()
        )

        // continuação da lógica de criação de user (salvando o hash no banco de dados)
    }
}
```

compare Hash
```ts
export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
		private hashManager: HashManager
  ) { }

  public login = async (
    input: LoginInputDTO
  ): Promise<LoginOutputDTO> => {
    const { email, password } = input

    const userDB = await this.userDatabase.findUserByEmail(email)

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado")
    }

    // if (password !== userDB.password) {
    //   throw new BadRequestError("'email' ou 'password' incorretos")
    // }

		// o password hasheado está no banco de dados
		const hashedPassword = userDB.password

		// o serviço hashManager analisa o password do body (plaintext) e o hash
		const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

		// validamos o resultado
		if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    const token = this.tokenManager.createToken(payload)

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token
    }

    return output
  }

	// outros endpoints
}
```

<!-- # Projeto teste
Projeto incentivado pela WatchBR

STACKS: Node.js (typescript), Express, TypeORM, PostgreSQL | 

ReactJs(NextJs), Tailwindcss

## ANOTAÇÕES IMPORTANTES

LINK DEPLOY FRONT-END: https://full-stack-test-deploy-eight.vercel.app

LINK DEPLOY BACK-END: https://full-stack-test-back-deploy.onrender.com
<br>
<strong>Obs: O Deploy da API terá um delay de requets por 50 segundos ou mais, pois o serviço de build que estou usando não tem licensa paga, visto que, o projeto é só um teste.<strong/>

<br/>
<br/>

## Execução local:
 ### Inicialmente, rode este comando
  ```
docker compose up -d
 ```

  ### Em sequência, esse:
  ```
    npm install
```

###  Em sequência, esse:
  ```
    npm run dev
```

O frontend irá rodar na porta 8080 enquanto o backend na 3000 


Se quiser usar o deploy do backend, basta comentar a constate "baseURL" de cima e descomentar de baixo no arquivo "api.ts" na pasta constants do frontend.

### Backend local
```ts
 const baseURL = 'http://localhost:3000';
//const baseURL = 'https://full-stack-test-back-deploy.onrender.com';
 ```
### Backend deploy
```ts
 //const baseURL = 'http://localhost:3000';
const baseURL = 'https://full-stack-test-back-deploy.onrender.com';
 ```


O teste consiste em criar uma aplicação com Backend(Laravel || NodeJS) que expõe uma API REST de um CRUD de usuários e filmes e uma aplicação web contendo uma interface(React/Next.JS) para login e acesso a dados de uma API externa.

# Back-end
    •  Todos os endpoints de consulta de dados devem ter autenticação por Token ou similar

# Front-end
O front-end deverá ser desenvolvido em React deve apresentar pelo menos os seguintes requisitos:
    •  Interface de login
    •  Feedbacks de usuário ou senha incorreta
    •  Listagem dos dados de filmes
    •  Paginação dos dados
    •  Listagem dos dados de Usuários

# Critérios de avaliação
    •  Funcionamento do projeto
    •  Estrutura do código
    •  Uso de boas práticas
    •  Cumprimento dos requisitos mínimos

# Deve ser entregue:
    •  Um repositório git (fork deste)
    •  Criação de um Readme com instruções de build

Não se deve fazer o commit de pastas como node_modules, o projeto deve instalar suas dependências a partir do package.json

# Extras:
    •  Publicação no Vercel.app
    •  Uso de Containers Docker
    •  Uso de Testes
    •  Build para produção -->