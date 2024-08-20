import { PgConnection } from './helpers/connection'
import { AddMovie, ListMovieAll, ListMovieById } from '@/domain/contracts/repos'
import { PgMovie } from './entities'
import { Movie } from '@/domain/entities'
import { UuidGenerator } from '@/infra/gateways'

export class PgMovieRepository implements
   ListMovieAll, ListMovieById, AddMovie{
    async listAll(): Promise<ListMovieAll.Result>{
        const pgMovieRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgMovie)

        const moviesPg = await pgMovieRepo.find()
        return moviesPg
    };

    async ListById(movie: ListMovieById.Params): Promise<ListMovieById.Result> {
        const pgMovieRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgMovie)

        let idExists: boolean | PgMovie = false

        const idFind = await pgMovieRepo.findOne({
            where: {
                id_movie: movie.id
            }
        }) 

        idFind ? idExists = idFind : idExists = false

        return idExists as Movie
    }

    async add(movie: AddMovie.Params): Promise<AddMovie.Result> {
        const pgMovieRepo = new PgMovie();

        const uuuid = new UuidGenerator();
        const id = uuuid.generate();

        pgMovieRepo.id_movie = id;
        pgMovieRepo.description_movie = movie.description;
        pgMovieRepo.director_movie = movie.director;
        pgMovieRepo.image_movie = movie.img;
        pgMovieRepo.title_movie = movie.title;
        pgMovieRepo.year_movie = movie.year;

        const entityManager = PgConnection.getInstance().connect().createEntityManager()

        await entityManager.transaction(async manager => {
            let saved = await manager.save(PgMovie, pgMovieRepo);
            await manager.save(saved)
        })

        return {
            id: pgMovieRepo.id_movie,
            statusCode: 201,
            message: 'Filme adicionado com sucesso'
        }}
}