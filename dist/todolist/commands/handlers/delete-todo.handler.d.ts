import { Cache } from 'cache-manager';
import { DeleteTodoCommand } from '../impl/delete-todo.command';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
export declare class DeleteTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: ITodoRepository, cacheManager: Cache);
    execute(command: DeleteTodoCommand): Promise<{
        status: number;
        message: string;
    }>;
}
