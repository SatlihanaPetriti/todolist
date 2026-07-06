import { Repository } from 'typeorm';
import { TodoEntity } from '../Entity/todo.entity';
import { CreateDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';
import { ITodoRepository } from './todo.repository.interface';
export declare class TodoRepository implements ITodoRepository {
    private readonly ormRepository;
    constructor(ormRepository: Repository<TodoEntity>);
    create(todo: CreateDto): Promise<TodoEntity>;
    findAll(): Promise<TodoEntity[]>;
    findById(id: number): Promise<TodoEntity | null>;
    update(id: number, todo: UpdateDto): Promise<TodoEntity>;
    delete(id: number): Promise<boolean>;
}
