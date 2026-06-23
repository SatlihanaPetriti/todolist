import { IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { GetAllTodosQuery } from '../impl/get-all-todos.query';
export declare class GetAllTodosHandler implements IQueryHandler<GetAllTodosQuery> {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    execute(query: GetAllTodosQuery): Promise<{}>;
}
