import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieType{
    @Field()
    title: string

    @Field(() => Int)
    length: number
}

@Resolver()
export class MovieResolver  {
  @Mutation(() => Movie)
  async createMovie(
    @Arg("options") options: MovieType
  ) {
     const movie = await Movie.create(options).save()
    return movie;
  }

  @Query(() => [Movie])
  getMovies(){
      return Movie.find()
  }
}
