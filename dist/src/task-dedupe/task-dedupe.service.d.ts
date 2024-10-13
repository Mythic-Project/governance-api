import { Cache } from 'cache-manager';
import * as TE from 'fp-ts/TaskEither';
import { Repository } from 'typeorm';
import * as errors from '@lib/errors/gql';
import { TaskDedupe } from './entities/TaskDedupe.entity';
export declare class TaskDedupeService {
    private readonly cacheManager;
    private readonly taskDedupeRepository;
    private taskMap;
    private logger;
    constructor(cacheManager: Cache, taskDedupeRepository: Repository<TaskDedupe>);
    dedupe<E, T>(args: {
        key: string;
        fn: TE.TaskEither<E, T>;
        ttl?: number;
    }): TE.TaskEither<E | errors.Exception, T>;
}
