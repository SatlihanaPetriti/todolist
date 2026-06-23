import {
    Inject,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import { TodoEntity } from '../../Entity/todo.entity';
import { UpdateTodoCommand } from '../impl/update-todo.command';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async execute(command: UpdateTodoCommand) {
        const { id, updateDto } = command;

        const task = await this.todoRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        try {
            await this.todoRepository.update(id, updateDto);

            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');

            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
                result: {
                    id,
                    ...updateDto,
                },
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Could not update task with ID ${id}`,
            );
        }
    }
}