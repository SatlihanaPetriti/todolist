import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../Entity/todo.entity';
import { CreateDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';
import { ITodoRepository } from './todo.repository.interface';

@Injectable()
export class TodoRepository implements ITodoRepository {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly ormRepository: Repository<TodoEntity>,
    ) { }

    public async create(todo: CreateDto): Promise<TodoEntity> {
        const entity = this.ormRepository.create(todo);
        return this.ormRepository.save(entity);
    }

    public async findAll(): Promise<TodoEntity[]> {
        return this.ormRepository.find();
    }

    public async findById(id: number): Promise<TodoEntity | null> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async update(id: number, todo: UpdateDto): Promise<TodoEntity> {
        await this.ormRepository.update(id, todo);
        return this.findById(id) as Promise<TodoEntity>;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.ormRepository.delete(id);
        console.log('result:', result);
        console.log('affected:', result.affected);
        return (result.affected ?? 0) > 0;
    }
}