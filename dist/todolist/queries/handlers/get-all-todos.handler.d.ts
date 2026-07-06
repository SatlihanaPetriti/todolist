import { IQueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
import { GetAllTodosQuery } from '../impl/get-all-todos.query';
export declare class GetAllTodosHandler implements IQueryHandler<GetAllTodosQuery> {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: ITodoRepository, cacheManager: Cache);
    execute(query: GetAllTodosQuery): Promise<{}>;
}
