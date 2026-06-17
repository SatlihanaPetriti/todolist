import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';
export declare class TodolistController {
    private readonly todoService;
    constructor(todoService: TodolistService);
    getAllTasks(): Promise<{}>;
    getTaskById(id: number): Promise<{}>;
    createTodo(bodyPara: CreateDto): Promise<CreateDto & import("./Entity/todo.entity").TodoEntity>;
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
