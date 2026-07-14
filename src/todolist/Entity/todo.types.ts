import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoType {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;
}