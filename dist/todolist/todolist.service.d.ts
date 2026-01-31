import { TodoEntity } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
export declare class TodolistService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<TodoEntity>);
    getAllTasks(): Promise<TodoEntity[]>;
    createTask(data: CreateDto): Promise<CreateDto & TodoEntity>;
    deleteTask(id: number): Promise<{
        status: number;
        message: string;
    }>;
    updateTask(id: number, updateCreateDto: {
        title?: string;
        description?: string;
    }): Promise<{
        status: number;
        message: string;
    }>;
}
