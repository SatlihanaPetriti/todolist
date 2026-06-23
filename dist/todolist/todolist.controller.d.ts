import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
export declare class TodolistController {
    private readonly todoService;
    private readonly commandBus;
    private readonly queryBus;
    constructor(todoService: TodolistService, commandBus: CommandBus, queryBus: QueryBus);
    getAllTodos(): Promise<any>;
    getTaskById(id: number): Promise<any>;
    createTodo(bodyPara: CreateDto): Promise<any>;
    deleteTask(id: number): Promise<any>;
    updateTask(id: number, data: CreateDto): Promise<any>;
}
