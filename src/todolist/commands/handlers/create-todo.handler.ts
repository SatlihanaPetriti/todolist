import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../../Entity/todo.entity';
import { CreateTodoCommand } from '../impl/create-todo.command';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TODO_REPOSITORY } from 'src/todolist/repositories/todo.repository.interface';
import { ITodoRepository } from 'src/todolist/repositories/todo.repository.interface';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler {

    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }
    async execute(command: CreateTodoCommand) {
        try {
            const { createDto } = command;

            const result = await this.todoRepository.create(createDto);

            await this.cacheManager.del('tasks');

            return result;
        } catch (error) {
            throw new HttpException('We could not create a new task',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}