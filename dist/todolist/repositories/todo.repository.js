"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../Entity/todo.entity");
let TodoRepository = class TodoRepository {
    ormRepository;
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async create(todo) {
        const entity = this.ormRepository.create(todo);
        return this.ormRepository.save(entity);
    }
    async findAll() {
        return this.ormRepository.find();
    }
    async findById(id) {
        return this.ormRepository.findOne({ where: { id } });
    }
    async update(id, todo) {
        await this.ormRepository.update(id, todo);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.ormRepository.delete(id);
        console.log('result:', result);
        console.log('affected:', result.affected);
        return (result.affected ?? 0) > 0;
    }
};
exports.TodoRepository = TodoRepository;
exports.TodoRepository = TodoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoRepository);
//# sourceMappingURL=todo.repository.js.map