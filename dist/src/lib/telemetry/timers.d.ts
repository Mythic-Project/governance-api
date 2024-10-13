export declare function start(id?: string): string;
export declare function startTE<R>(id: string): <E>(fa: import("fp-ts/TaskEither").TaskEither<E, R>) => import("fp-ts/TaskEither").TaskEither<E, R>;
export declare function end(id: string, parentId?: string, title?: string): void;
export declare function endTE<R>(id: string, parentId?: string, title?: string): <E>(fa: import("fp-ts/TaskEither").TaskEither<E, R>) => import("fp-ts/TaskEither").TaskEither<E, R>;
