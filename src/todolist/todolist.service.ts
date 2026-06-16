import { HttpException, Injectable, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { TodoEntity } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TodolistService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    public async getAllTasks() {
        try {
            const cachedTasks = await this.cacheManager.get('tasks');
            if (cachedTasks) {
                console.log('Data from Redis');
                return cachedTasks;
            }
            console.log('Data from MySQL');
            const result = await this.todoRepository.find();
            await this.cacheManager.set('tasks', result, 60000);
            return result;
        } catch (error) {
            throw new HttpException('We could not found date', HttpStatus.NOT_FOUND);
        }
    }

    public async createTask(data: CreateDto) {
        try {
            const result = await this.todoRepository.save(data);

            await this.cacheManager.del('tasks');

            return result;
        } catch (error) {
            throw new HttpException(
                'We could not create a new task',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async deleteTask(id: number) {
        try {
            const task = await this.todoRepository.findOne({ where: { id } });

            if (!task) {
                throw new HttpException(
                    `Task with ID ${id} not found`,
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.todoRepository.delete(id);

            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            };
        } catch (error) {
            throw new HttpException(
                `Could not delete task with ID ${id}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async updateTask(id: number, data: CreateDto) {
        const task = await this.todoRepository.findOne({ where: { id } });

        if (!task) {
            throw new HttpException(
                `Task with ID ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            await this.todoRepository.update(id, data);

            await this.cacheManager.del('tasks');

            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
                result: { id, ...data },
            };
        } catch (error) {
            throw new HttpException(
                `Could not update task with ID ${id}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
