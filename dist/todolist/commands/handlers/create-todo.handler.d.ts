import { Repository } from 'typeorm';
import { TodoEntity } from '../../Entity/todo.entity';
import { CreateTodoCommand } from '../impl/create-todo.command';
import { Cache } from 'cache-manager';
export declare class CreateTodoHandler {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    execute(command: CreateTodoCommand): Promise<TodoEntity>;
}
