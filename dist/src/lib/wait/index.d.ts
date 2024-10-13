import * as TA from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
export declare function wait(ms: number): Promise<true>;
export declare function waitT(ms: number): TA.Task<true>;
export declare function waitTE(ms: number): TE.TaskEither<never, true>;
