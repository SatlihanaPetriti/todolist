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
exports.TodoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const cqrs_1 = require("@nestjs/cqrs");
const todo_types_1 = require("./Entity/todo.types");
const create_todo_input_1 = require("./dto/create-todo.input");
const create_todo_command_1 = require("./commands/impl/create-todo.command");
const get_all_todos_query_1 = require("./queries/impl/get-all-todos.query");
const get_todo_by_id_query_1 = require("./queries/impl/get-todo-by-id.query");
let TodoResolver = class TodoResolver {
    commandBus;
    queryBus;
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async getAllTodos() {
        return this.queryBus.execute(new get_all_todos_query_1.GetAllTodosQuery());
    }
    async getTodoById(id) {
        return this.queryBus.execute(new get_todo_by_id_query_1.GetTodoByIdQuery(id));
    }
    async createTodo(input) {
        return this.commandBus.execute(new create_todo_command_1.CreateTodoCommand(input));
    }
};
exports.TodoResolver = TodoResolver;
__decorate([
    (0, graphql_1.Query)(() => [todo_types_1.TodoType], { name: 'todos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getAllTodos", null);
__decorate([
    (0, graphql_1.Query)(() => todo_types_1.TodoType, { name: 'todo' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoById", null);
__decorate([
    (0, graphql_1.Mutation)(() => todo_types_1.TodoType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_input_1.CreateTodoInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "createTodo", null);
exports.TodoResolver = TodoResolver = __decorate([
    (0, graphql_1.Resolver)(() => todo_types_1.TodoType),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], TodoResolver);
//# sourceMappingURL=todo.resolver.js.map