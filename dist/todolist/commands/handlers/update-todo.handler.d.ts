import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { UpdateTodoCommand } from '../impl/update-todo.command';
export declare class UpdateTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    execute(command: UpdateTodoCommand): Promise<{
        status: number;
        message: string;
        result: {
            title: string;
            description: string;
            id: number;
        };
    }>;
}
