import { IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { GetTodoByIdQuery } from '../impl/get-todo-by-id.query';
export declare class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    execute(query: GetTodoByIdQuery): Promise<{}>;
}
