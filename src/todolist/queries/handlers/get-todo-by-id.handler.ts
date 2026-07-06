import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ITodoRepository, TODO_REPOSITORY } from '../../repositories/todo.repository.interface';
import { GetTodoByIdQuery } from '../impl/get-todo-by-id.query';

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async execute(query: GetTodoByIdQuery) {
        const { id } = query;
        const cacheKey = `task:${id}`;

        const cachedTask = await this.cacheManager.get(cacheKey);
        if (cachedTask) {
            console.log(`Redis: hit ${cacheKey}`);
            return cachedTask;
        }

        console.log(`Redis: miss ${cacheKey}`);

        const task = await this.todoRepository.findById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        await this.cacheManager.set(cacheKey, task, 60000);
        console.log(`Redis: ${cacheKey} cached`);

        return task;
    }
}