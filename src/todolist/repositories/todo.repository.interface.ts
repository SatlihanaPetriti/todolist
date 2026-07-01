import { TodoEntity } from "../Entity/todo.entity";
import { CreateDto } from '../dto/create.dto';
export const TODO_REPOSITORY = 'TODO_REPOSITORY';

export interface ITodoRepository {
    create(todo: CreateDto): Promise<TodoEntity>;
    findAll(): Promise<TodoEntity[]>;
    findById(id: number): Promise<TodoEntity | null>;
    update(id: number, todo: CreateDto): Promise<TodoEntity>;
    delete(id: number): Promise<boolean>;
}