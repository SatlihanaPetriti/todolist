import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';
import { CommandBus } from "@nestjs/cqrs";
export declare class TodolistController {
    private readonly todoService;
    private readonly commandBus;
    constructor(todoService: TodolistService, commandBus: CommandBus);
    getAllTasks(): Promise<{}>;
    getTaskById(id: number): Promise<{}>;
    createTodo(bodyPara: CreateDto): Promise<any>;
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
