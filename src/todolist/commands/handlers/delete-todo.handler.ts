import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DeleteTodoCommand } from '../impl/delete-todo.command';
import { ITodoRepository, TODO_REPOSITORY } from '../../repositories/todo.repository.interface';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    public async execute(command: DeleteTodoCommand) {
        const { id } = command;

        const task = await this.todoRepository.findById(id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        try {
            const deleted = await this.todoRepository.delete(id);
            if (!deleted) {
                throw new InternalServerErrorException(`Could not delete task with ID ${id}`);
            }

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