import { Movie } from "../entity/Movie";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  length: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  length?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("options") options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update(id, input);
    return true;
  }

  @Query(() => [Movie])
  getMovies() {
    return Movie.find();
  }
}
