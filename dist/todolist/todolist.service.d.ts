import { TodoEntity } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { Cache } from 'cache-manager';
export declare class TodolistService {
    private readonly todoRepository;
    private readonly cacheManager;
    constructor(todoRepository: Repository<TodoEntity>, cacheManager: Cache);
    getAllTasks(): Promise<{}>;
    getTaskById(id: number): Promise<{}>;
    createTask(data: CreateDto): Promise<CreateDto & TodoEntity>;
    deleteTask(id: number): Promise<{
        status: number;
        message: string;
    }>;
    updateTask(id: number, data: CreateDto): Promise<{
        status: number;
        message: string;
        result: {
            title: string;
            description: string;
            id: number;
        };
    }>;
}
