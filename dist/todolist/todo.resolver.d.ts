import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoInput } from './dto/create-todo.input';
export declare class TodoResolver {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getAllTodos(): Promise<any>;
    getTodoById(id: number): Promise<any>;
    createTodo(input: CreateTodoInput): Promise<any>;
}
