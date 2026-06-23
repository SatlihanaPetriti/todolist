import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { TodoEntity } from '../../Entity/todo.entity';
import { DeleteTodoCommand } from '../impl/delete-todo.command';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async execute(command: DeleteTodoCommand) {
        const { id } = command;
        const task = await this.todoRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        try {
            await this.todoRepository.delete(id);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');

            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Could not delete task with ID ${id}`,
            );
        }
    }
}