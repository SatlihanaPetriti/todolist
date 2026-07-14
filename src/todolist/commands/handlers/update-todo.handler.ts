import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateTodoCommand } from '../impl/update-todo.command';
import { ITodoRepository, TODO_REPOSITORY } from '../../repositories/todo.repository.interface';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    public async execute(command: UpdateTodoCommand) {
        const { id, updateDto } = command;

        const task = await this.todoRepository.findById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        try {
            const updated = await this.todoRepository.update(id, updateDto);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');
            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
                result: updated,
            };
        } catch (error: any) {
            throw new InternalServerErrorException(
                `Could not update task with ID ${id}`,
            );
        }
    }
}