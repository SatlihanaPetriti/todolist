import { CreateTodoCommand } from '../impl/create-todo.command';
import { Cache } from 'cache-manager';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
export declare class CreateTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: ITodoRepository, cacheManager: Cache);
    execute(command: CreateTodoCommand): Promise<import("../../Entity/todo.entity").TodoEntity>;
}
