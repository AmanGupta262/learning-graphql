import { Query, Resolver } from "type-graphql"

@Resolver()
export class HelloWorld{
    @Query(() => String)
    hello() {
        return "Hi"
    }
}