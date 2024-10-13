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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionType = exports.EdgeType = exports.ConnectionArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const Relay = require("graphql-relay");
const Cursor_1 = require("../scalars/Cursor");
let ConnectionArgs = class ConnectionArgs {
};
__decorate([
    (0, graphql_1.Field)(() => Cursor_1.CursorScalar, {
        description: '`after` cursor for pagination',
        nullable: true,
    }),
    __metadata("design:type", String)
], ConnectionArgs.prototype, "after", void 0);
__decorate([
    (0, graphql_1.Field)(() => Cursor_1.CursorScalar, {
        description: '`before` cursor for pagination',
        nullable: true,
    }),
    __metadata("design:type", String)
], ConnectionArgs.prototype, "before", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Count of items to grab from the head of the full list',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ConnectionArgs.prototype, "first", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Count of items to grab form the tail of the full list',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ConnectionArgs.prototype, "last", void 0);
ConnectionArgs = __decorate([
    (0, graphql_1.ArgsType)()
], ConnectionArgs);
exports.ConnectionArgs = ConnectionArgs;
let PageInfo = class PageInfo {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'If there are additional results after these',
    }),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'If there are additional results before these',
    }),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Cursor_1.CursorScalar, {
        description: 'A cursor representing the head of the returned results',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PageInfo.prototype, "startCursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Cursor_1.CursorScalar, {
        description: 'A cursor representing the end of the returned results',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PageInfo.prototype, "endCursor", void 0);
PageInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageInfo);
function EdgeType(nodeName, nodeType) {
    let Edge = class Edge {
    };
    __decorate([
        (0, graphql_1.Field)(() => nodeType, {
            description: `A single ${nodeName}`,
        }),
        __metadata("design:type", Object)
    ], Edge.prototype, "node", void 0);
    __decorate([
        (0, graphql_1.Field)(() => Cursor_1.CursorScalar, {
            description: 'A cursor representing this node. Used in `before` and `after` args.',
        }),
        __metadata("design:type", String)
    ], Edge.prototype, "cursor", void 0);
    Edge = __decorate([
        (0, graphql_1.ObjectType)(`${nodeName}Edge`, { isAbstract: true })
    ], Edge);
    return Edge;
}
exports.EdgeType = EdgeType;
function ConnectionType(nodeName, edgeClass) {
    let Connection = class Connection {
    };
    __decorate([
        (0, graphql_1.Field)(() => PageInfo, {
            description: 'Information about this page',
        }),
        __metadata("design:type", PageInfo)
    ], Connection.prototype, "pageInfo", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [edgeClass], {
            description: 'The results found in this page',
        }),
        __metadata("design:type", Array)
    ], Connection.prototype, "edges", void 0);
    Connection = __decorate([
        (0, graphql_1.ObjectType)(`${nodeName}Connection`, { isAbstract: true })
    ], Connection);
    return Connection;
}
exports.ConnectionType = ConnectionType;
//# sourceMappingURL=Connection.js.map