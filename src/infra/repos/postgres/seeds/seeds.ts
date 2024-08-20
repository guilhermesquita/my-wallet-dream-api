import { PgMovie, PgUser } from "../entities";
import { PgConnection } from "../helpers";

export async function run() {
   const pgUserRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgUser);

   const pgMovieRepo = PgConnection.getInstance()
      .connect()
      .getRepository(PgMovie);

   const movieFind = await pgMovieRepo.find()

   //   const users = [
   //     pgUserRepo.create({ nm_user: 'John Doe', 
   //         password_user: 'password seed',
   //         created_at: new Date(),
   //         email_user: 'john.doe@example.com',
   //      }),
   //      pgUserRepo.create({ nm_user: 'Jane Doe', 
   //         password_user: 'password seed',
   //         created_at: new Date(),
   //         email_user: 'jane.doe@example.com',
   //      }),
   //   ];

   const movies = [
      pgMovieRepo.create({
         title_movie: 'E.T. - O Extraterrestre',
         description_movie: 'Um garoto faz amizade com um ser de outro planeta, que ficou sozinho na Terra, protegendo-o de todas as formas para evitar que ele seja capturado e transformado em cobaia. Gradativamente, surge entre os dois uma forte amizade.',
         id_movie: 'dada',
         image_movie: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/10/evento-ET-40-anos-informac%CC%A7o%CC%83es.webp',
         director_movie: 'Steven Spielberg',
         year_movie: '1982',
      })
   ];

   const entityManager = PgConnection.getInstance().connect().createEntityManager()

     if (movieFind.length < 1){
      await pgMovieRepo.save(movies);
     }

   await entityManager.transaction(async manager => {
      let saved = await manager.save(PgMovie, pgMovieRepo);
      await manager.save(saved)
   })

   //   await pgUserRepo.save(users);
}