import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';
export declare class TodolistController {
    private readonly todoService;
    constructor(todoService: TodolistService);
    getAllTasks(): Promise<import("./Entity/todo.entity").TodoEntity[]>;
    createTodo(bodyPara: CreateDto): Promise<CreateDto & import("./Entity/todo.entity").TodoEntity>;
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
