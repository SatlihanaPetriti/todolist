import { IQueryHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { ITodoRepository } from '../../repositories/todo.repository.interface';
import { GetTodoByIdQuery } from '../impl/get-todo-by-id.query';
export declare class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: ITodoRepository, cacheManager: Cache);
    execute(query: GetTodoByIdQuery): Promise<{}>;
}
