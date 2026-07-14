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
exports.GetTodoByIdHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cache_manager_1 = require("@nestjs/cache-manager");
const todo_repository_interface_1 = require("../../repositories/todo.repository.interface");
const get_todo_by_id_query_1 = require("../impl/get-todo-by-id.query");
let GetTodoByIdHandler = class GetTodoByIdHandler {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async execute(query) {
        const { id } = query;
        const cacheKey = `task:${id}`;
        const cachedTask = await this.cacheManager.get(cacheKey);
        if (cachedTask) {
            console.log(`Redis: hit ${cacheKey}`);
            return cachedTask;
        }
        console.log(`Redis: miss ${cacheKey}`);
        const task = await this.todoRepository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        await this.cacheManager.set(cacheKey, task, 300000);
        console.log(`Redis: ${cacheKey} cached`);
        return task;
    }
};
exports.GetTodoByIdHandler = GetTodoByIdHandler;
exports.GetTodoByIdHandler = GetTodoByIdHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_todo_by_id_query_1.GetTodoByIdQuery),
    __param(0, (0, common_1.Inject)(todo_repository_interface_1.TODO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, Object])
], GetTodoByIdHandler);
//# sourceMappingURL=get-todo-by-id.handler.js.map