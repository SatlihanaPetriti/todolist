import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { DeleteTodoCommand } from '../impl/delete-todo.command';
export declare class DeleteTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    execute(command: DeleteTodoCommand): Promise<{
        status: number;
        message: string;
    }>;
}
