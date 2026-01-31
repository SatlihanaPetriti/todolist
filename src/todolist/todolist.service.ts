import { HttpException, Injectable, } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { TodoEntity } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
// import { title } from 'process';

@Injectable()
export class TodolistService {
    constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) { }

    public async getAllTasks() {
        try {
            const result = await this.todoRepository.find();
            return result;
        } catch (error) {
            throw new HttpException('We could not found date', HttpStatus.NOT_FOUND);
        }
    }

    public async createTask(data: CreateDto) {
        try {
            const result = await this.todoRepository.save(data);
            return result;
        } catch (error) {
            throw new HttpException('We could not create a new task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteTask(id: number) {
        try {
            const task = await this.todoRepository.findOne({ where: { id } });
            if (!task) {
                throw new HttpException(`Task with ID ${id} not found`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.todoRepository.delete(id);
            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            }
        } catch (error) {
            throw new HttpException(`Could not delete task with ID ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateTask(id: number, updateCreateDto: { title?: string; description?: string }) {
        try {
            const task = await this.todoRepository.findOne({ where: { id } });
            if (!task) {
                throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            await this.todoRepository.update(id, { title: updateCreateDto.title, description: updateCreateDto.description
             })

            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
            };
        } catch (error) {
            throw new HttpException(`Could not delete task with ID ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
