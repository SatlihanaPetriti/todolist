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

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async execute(command: CreateTodoCommand) {
        try {
            const { createDto } = command;
            const todo = this.todoRepository.create(createDto);
            const result = await this.todoRepository.save(todo);
            await this.cacheManager.del('tasks');
            return result;
        } catch (error) {
            throw new HttpException(
                'We could not create a new task',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}