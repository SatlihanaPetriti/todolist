import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { GetAllTodosQuery } from '../impl/get-all-todos.query';

@QueryHandler(GetAllTodosQuery)
export class GetAllTodosHandler implements IQueryHandler<GetAllTodosQuery> {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async execute(query: GetAllTodosQuery) {
        try {
            const cachedTasks = await this.cacheManager.get('tasks');

            if (cachedTasks) {
                console.log('Data from Redis');
                console.log(cachedTasks);
                return cachedTasks;
            }

            console.log('Data from MySQL');

            const result = await this.todoRepository.find();

            await this.cacheManager.set('tasks', result, 300000);

            return result;
        } catch (error) {
            throw new HttpException(
                'We could not find data',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}