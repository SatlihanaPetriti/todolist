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
exports.GetAllTodosHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../../Entity/todo.entity");
const get_all_todos_query_1 = require("../impl/get-all-todos.query");
let GetAllTodosHandler = class GetAllTodosHandler {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async execute(query) {
        try {
            const cachedTasks = await this.cacheManager.get('tasks');
            if (cachedTasks) {
                console.log('Data from Redis');
                console.log(cachedTasks);
                return cachedTasks;
            }
            console.log('Data from MySQL');
            const result = await this.todoRepository.find();
            await this.cacheManager.set('tasks', result, 300000);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('We could not find data', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.GetAllTodosHandler = GetAllTodosHandler;
exports.GetAllTodosHandler = GetAllTodosHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_all_todos_query_1.GetAllTodosQuery),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], GetAllTodosHandler);
//# sourceMappingURL=get-all-todos.handler.js.map