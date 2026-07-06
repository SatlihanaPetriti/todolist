import { Cache } from 'cache-manager';
import { UpdateTodoCommand } from '../impl/update-todo.command';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
export declare class UpdateTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: ITodoRepository, cacheManager: Cache);
    execute(command: UpdateTodoCommand): Promise<{
        status: number;
        message: string;
        result: import("../../Entity/todo.entity").TodoEntity;
    }>;
}
