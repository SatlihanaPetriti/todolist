import { UpdateDto } from '../../dto/update.dto';
export declare class UpdateTodoCommand {
    readonly id: number;
    readonly updateDto: UpdateDto;
    constructor(id: number, updateDto: UpdateDto);
}
