"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTE = exports.end = exports.startTE = exports.start = void 0;
const TaskEither_1 = require("fp-ts/TaskEither");
const TIMERS = new Map();
const SPANS = new Map();
let cur = 0;
function printSpan(span, depth = 1) {
    const indent = Array.from({ length: depth }).map(() => '').join('  ');
    const formatter = new Intl.NumberFormat();
    const children = SPANS.get(span.id);
    console.log(`${indent}Timer ${span.id}`);
    if (span.title) {
        console.log(`${indent}  ${span.title}`);
    }
    console.log(`${indent}  Duration: ${formatter.format(span.duration)}ms`);
    if (children && children.length) {
        for (const child of children) {
            printSpan(child, depth + 1);
        }
    }
}
function start(id) {
    const key = id || (cur++).toString();
    TIMERS.set(key, Date.now());
    return key;
}
exports.start = start;
function startTE(id) {
    return (0, TaskEither_1.map)(result => {
        start(id);
        return result;
    });
}
exports.startTE = startTE;
function end(id, parentId, title) {
    const start = TIMERS.get(id);
    if (start) {
        TIMERS.delete(id);
        const span = {
            id,
            title,
            duration: Date.now() - start,
        };
        if (parentId) {
            const curSpans = SPANS.get(parentId);
            SPANS.set(parentId, (curSpans || []).concat(span));
        }
        else {
            printSpan(span);
        }
    }
}
exports.end = end;
function endTE(id, parentId, title) {
    return (0, TaskEither_1.map)(result => {
        end(id, parentId, title);
        return result;
    });
}
exports.endTE = endTE;
//# sourceMappingURL=timers.js.map