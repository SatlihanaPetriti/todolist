import { TodoEntity } from "../Entity/todo.entity";
import { CreateDto } from '../dto/create.dto';
import { UpdateDto } from '../dto/update.dto';
export declare const TODO_REPOSITORY = "TODO_REPOSITORY";
export interface ITodoRepository {
    create(todo: CreateDto): Promise<TodoEntity>;
    findAll(): Promise<TodoEntity[]>;
    findById(id: number): Promise<TodoEntity | null>;
    update(id: number, todo: UpdateDto): Promise<TodoEntity>;
    delete(id: number): Promise<boolean>;
}
