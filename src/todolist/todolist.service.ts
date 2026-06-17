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
                console.log(cachedTasks);
                return cachedTasks;
            }
            console.log('Data from MySQL');
            const result = await this.todoRepository.find();
            await this.cacheManager.set('tasks', result, 300000);
            return result;
        } catch (error) {
            throw new HttpException('We could not found data', HttpStatus.NOT_FOUND);
        }
    }
    public async getTaskById(id: number) {
        const cacheKey = `task:${id}`;

        const cachedTask = await this.cacheManager.get(cacheKey);

        if (cachedTask) {
            console.log(`Redis: hit ${cacheKey}`);
            console.log(cachedTask);
            return cachedTask;
        }

        console.log(`Redis: miss ${cacheKey}`);

        const task = await this.todoRepository.findOne({ where: { id } });

        if (!task) {
            throw new HttpException(
                `Task with ID ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        await this.cacheManager.set(cacheKey, task, 60000);

        const checkCache = await this.cacheManager.get(cacheKey);

        console.log(`Redis: ${cacheKey} cached`);
        console.log('Redis check after set:', checkCache);

        return task;
    }

    public async createTask(data: CreateDto) {
        try {
            const result = await this.todoRepository.save(data);

            await this.cacheManager.del('tasks');

            return result;
        } catch (error) {
            throw new HttpException('We could not create a new task', HttpStatus.INTERNAL_SERVER_ERROR);
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
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');

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

            await this.cacheManager.del(`task:${id}`);
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
