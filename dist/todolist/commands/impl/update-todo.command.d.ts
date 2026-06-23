import { CreateDto } from '../../dto/create.dto';
export declare class UpdateTodoCommand {
    readonly id: number;
    readonly updateDto: CreateDto;
    constructor(id: number, updateDto: CreateDto);
}
