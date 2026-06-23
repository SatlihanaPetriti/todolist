import { CreateDto } from '../../dto/create.dto';

export class UpdateTodoCommand {
    constructor(
        public readonly id: number,
        public readonly updateDto: CreateDto,
    ) { }
}