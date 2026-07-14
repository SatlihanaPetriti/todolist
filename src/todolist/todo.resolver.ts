import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodoType } from './Entity/todo.types';
// import { CreateDto } from './dto/create.dto';
import { CreateTodoInput } from './dto/create-todo.input';
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { GetAllTodosQuery } from './queries/impl/get-all-todos.query';
import { GetTodoByIdQuery } from './queries/impl/get-todo-by-id.query';


@Resolver(() => TodoType)
export class TodoResolver {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Query(() => [TodoType], { name: 'todos' })
    async getAllTodos() {
        return this.queryBus.execute(new GetAllTodosQuery());
    }

    @Query(() => TodoType, { name: 'todo' })
    async getTodoById(@Args('id', { type: () => Int }) id: number) {
        return this.queryBus.execute(new GetTodoByIdQuery(id));
    }

    @Mutation(() => TodoType)
    async createTodo(@Args('input') input: CreateTodoInput) {
        return this.commandBus.execute(new CreateTodoCommand(input));
    }
}