import { UpdateDto } from '../../dto/update.dto';

export class UpdateTodoCommand {
    constructor(
        public readonly id: number,
        public readonly updateDto: UpdateDto,
    ) { }
}