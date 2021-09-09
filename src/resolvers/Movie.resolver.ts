import { Movie } from "../entity/Movie";
import { Arg, Int, Mutation, Resolver } from "type-graphql";

@Resolver()
export class MovieResolver  {
  @Mutation(() => Boolean)
  async createMovie(
    @Arg("title") title: string,
    @Arg("length", () => Int) length: number
  ) {
      await Movie.insert({title, length})
    return true;
  }
}
