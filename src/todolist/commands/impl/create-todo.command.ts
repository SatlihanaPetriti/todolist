import { CreateDto } from '../../dto/create.dto';

export class CreateTodoCommand {
    constructor(
        public readonly createDto: CreateDto,
    ) { }
}