import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getTvl(force?: string): Promise<import("./entities/Tvl.entity").Data>;
}
