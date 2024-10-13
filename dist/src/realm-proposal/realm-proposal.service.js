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
exports.RealmProposalService = void 0;
const common_1 = require("@nestjs/common");
const spl_governance_1 = require("@solana/spl-governance");
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = require("bignumber.js");
const date_fns_1 = require("date-fns");
const convertTextToRichTextDocument_1 = require("../lib/textManipulation/convertTextToRichTextDocument");
const helius_service_1 = require("../helius/helius.service");
const realm_governance_service_1 = require("../realm-governance/realm-governance.service");
const realm_member_service_1 = require("../realm-member/realm-member.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const pagination_1 = require("./dto/pagination");
const RealmProposalState_1 = require("./dto/RealmProposalState");
const RealmProposalUserVote_1 = require("./dto/RealmProposalUserVote");
let RealmProposalService = class RealmProposalService {
    constructor(cacheManager, heliusService, realmGovernanceService, realmMemberService, staleCacheService) {
        this.cacheManager = cacheManager;
        this.heliusService = heliusService;
        this.realmGovernanceService = realmGovernanceService;
        this.realmMemberService = realmMemberService;
        this.staleCacheService = staleCacheService;
        this.buildProposalState = (proposal, governance) => {
            let hasInstructions = false;
            let votingEnded = false;
            if (governance.config.maxVotingTime && proposal.state === spl_governance_1.ProposalState.Voting) {
                const nowUnixSeconds = Date.now() / 1000;
                const votingAt = proposal.votingAt
                    ? new Date(proposal.votingAt.toNumber() * 1000).getTime() / 1000
                    : 0;
                const maxVotingTime = governance.config.maxVotingTime;
                const timeToVoteEnd = votingAt + maxVotingTime - nowUnixSeconds;
                if (timeToVoteEnd <= 0) {
                    votingEnded = true;
                }
            }
            if (proposal.options && proposal.options.length) {
                for (const option of proposal.options) {
                    if (option.instructionsCount > 0) {
                        hasInstructions = true;
                        break;
                    }
                }
            }
            if (proposal.instructionsCount && proposal.instructionsCount > 0) {
                hasInstructions = true;
            }
            switch (proposal.state) {
                case spl_governance_1.ProposalState.Cancelled:
                    return RealmProposalState_1.RealmProposalState.Cancelled;
                case spl_governance_1.ProposalState.Completed:
                    return RealmProposalState_1.RealmProposalState.Completed;
                case spl_governance_1.ProposalState.Defeated:
                    return RealmProposalState_1.RealmProposalState.Defeated;
                case spl_governance_1.ProposalState.Draft:
                    return RealmProposalState_1.RealmProposalState.Draft;
                case spl_governance_1.ProposalState.Executing:
                    return RealmProposalState_1.RealmProposalState.Executable;
                case spl_governance_1.ProposalState.ExecutingWithErrors:
                    return RealmProposalState_1.RealmProposalState.ExecutingWithErrors;
                case spl_governance_1.ProposalState.SigningOff:
                    return RealmProposalState_1.RealmProposalState.SigningOff;
                case spl_governance_1.ProposalState.Succeeded:
                    return !hasInstructions ? RealmProposalState_1.RealmProposalState.Completed : RealmProposalState_1.RealmProposalState.Executable;
                default:
                    return votingEnded ? RealmProposalState_1.RealmProposalState.Finalizing : RealmProposalState_1.RealmProposalState.Voting;
            }
        };
        this.buildPropsalUpdated = (proposal) => {
            if (proposal.closedAt) {
                return new Date(proposal.closedAt.toNumber() * 1000);
            }
            else if (proposal.executingAt) {
                return new Date(proposal.executingAt.toNumber() * 1000);
            }
            else if (proposal.votingCompletedAt) {
                return new Date(proposal.votingCompletedAt.toNumber() * 1000);
            }
            else if (proposal.votingAt) {
                return new Date(proposal.votingAt.toNumber() * 1000);
            }
            else if (proposal.startVotingAt) {
                return new Date(proposal.startVotingAt.toNumber() * 1000);
            }
            else if (proposal.signingOffAt) {
                return new Date(proposal.signingOffAt.toNumber() * 1000);
            }
            else {
                return new Date(proposal.draftAt.toNumber() * 1000);
            }
        };
        this.buildProposalUserVote = (voteRecords, proposalAddress) => {
            var _a, _b, _c;
            const record = voteRecords.find((record) => record.proposal.toBase58() === proposalAddress);
            if (record) {
                let type = null;
                let weight = new bignumber_js_1.default(0);
                if ((_a = record.vote) === null || _a === void 0 ? void 0 : _a.veto) {
                    type = RealmProposalUserVote_1.RealmProposalUserVoteType.Veto;
                    if (record.voteWeight) {
                        weight = new bignumber_js_1.default(record.voteWeight.no.toString());
                    }
                }
                else if (((_b = record.vote) === null || _b === void 0 ? void 0 : _b.toYesNoVote()) === spl_governance_1.YesNoVote.Yes) {
                    type = RealmProposalUserVote_1.RealmProposalUserVoteType.Yes;
                    if (record.voteWeight) {
                        weight = new bignumber_js_1.default(record.voteWeight.yes.toString());
                    }
                }
                else if (((_c = record.vote) === null || _c === void 0 ? void 0 : _c.toYesNoVote()) === spl_governance_1.YesNoVote.No) {
                    type = RealmProposalUserVote_1.RealmProposalUserVoteType.No;
                    if (record.voteWeight) {
                        weight = new bignumber_js_1.default(record.voteWeight.no.toString());
                    }
                }
                else {
                    type = RealmProposalUserVote_1.RealmProposalUserVoteType.Abstain;
                }
                return { type, weight };
            }
            return null;
        };
        this.sortRelevance = (a, b) => {
            if (a.state === RealmProposalState_1.RealmProposalState.Voting && b.state !== RealmProposalState_1.RealmProposalState.Voting) {
                return -1;
            }
            else if (a.state !== RealmProposalState_1.RealmProposalState.Voting && b.state === RealmProposalState_1.RealmProposalState.Voting) {
                return 1;
            }
            else if (a.state === RealmProposalState_1.RealmProposalState.Executable &&
                b.state !== RealmProposalState_1.RealmProposalState.Executable) {
                return -1;
            }
            else if (a.state !== RealmProposalState_1.RealmProposalState.Executable &&
                b.state === RealmProposalState_1.RealmProposalState.Executable) {
                return 1;
            }
            else if (a.state === RealmProposalState_1.RealmProposalState.Finalizing &&
                b.state !== RealmProposalState_1.RealmProposalState.Finalizing) {
                return -1;
            }
            else if (a.state !== RealmProposalState_1.RealmProposalState.Finalizing &&
                b.state === RealmProposalState_1.RealmProposalState.Finalizing) {
                return 1;
            }
            else {
                return this.sortTime(a, b);
            }
        };
        this.sortTime = (a, b) => {
            const compare = (0, date_fns_1.compareDesc)(a.updated, b.updated);
            if (compare === 0) {
                return a.publicKey.toBase58().localeCompare(b.publicKey.toBase58());
            }
            else {
                return compare;
            }
        };
    }
    async getProposalByPublicKey(proposalPublicKey, environment) {
        const proposal = await this.heliusService.getProposal(proposalPublicKey, environment);
        const governance = await this.heliusService.getGovernance(proposal.account.governance, environment);
        const [programId, realm, mint] = await Promise.all([
            this.heliusService.getProgramId(governance.account.realm, environment),
            this.heliusService.getRealm(governance.account.realm, environment),
            this.heliusService.getTokenMintInfo(proposal.account.governingTokenMint, environment),
        ]);
        const proposalVotes = await this.heliusService.getVoteRecordsByProposal(proposalPublicKey, programId, environment);
        const realmProposal = {
            author: {
                publicKey: proposal.account.tokenOwnerRecord,
            },
            created: new Date(proposal.account.draftAt.toNumber() * 1000),
            document: await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(proposal.account.descriptionLink),
            description: proposal.account.descriptionLink,
            publicKey: proposal.pubkey,
            myVote: null,
            state: this.buildProposalState(proposal.account, governance.account),
            title: proposal.account.name,
            updated: this.buildPropsalUpdated(proposal.account),
            voteBreakdown: this.buildVotingBreakdown(proposal, proposalVotes, governance.account, realm, mint === null || mint === void 0 ? void 0 : mint.account),
        };
        return realmProposal;
    }
    async getProposalForUserByPublicKey(proposalPublicKey, requestingUser, environment) {
        const proposal = await this.heliusService.getProposal(proposalPublicKey, environment);
        const governance = await this.heliusService.getGovernance(proposal.account.governance, environment);
        const [programId, realm, mint] = await Promise.all([
            this.heliusService.getProgramId(governance.account.realm, environment),
            this.heliusService.getRealm(governance.account.realm, environment),
            this.heliusService.getTokenMintInfo(proposal.account.governingTokenMint, environment),
        ]);
        const [proposalVotes, userVotes] = await Promise.all([
            this.heliusService.getVoteRecordsByProposal(proposalPublicKey, programId, environment),
            requestingUser
                ? this.heliusService.getVoteRecordsByVoter(programId, requestingUser, environment)
                : [],
        ]);
        const realmProposal = {
            author: {
                publicKey: proposal.account.tokenOwnerRecord,
            },
            created: new Date(proposal.account.draftAt.toNumber() * 1000),
            document: await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(proposal.account.descriptionLink),
            description: proposal.account.descriptionLink,
            publicKey: proposal.pubkey,
            myVote: this.buildProposalUserVote(userVotes.map((v) => v.account), proposal.pubkey.toBase58()),
            state: this.buildProposalState(proposal.account, governance.account),
            title: proposal.account.name,
            updated: this.buildPropsalUpdated(proposal.account),
            voteBreakdown: this.buildVotingBreakdown(proposal, proposalVotes, governance.account, realm, mint === null || mint === void 0 ? void 0 : mint.account),
        };
        return realmProposal;
    }
    async getProposalsForRealm(realmPublicKey, environment) {
        const [rawProposals, programId, realm] = await Promise.all([
            this.heliusService.getAllProposalsForRealm(realmPublicKey, environment),
            this.heliusService.getProgramId(realmPublicKey, environment),
            this.heliusService.getRealm(realmPublicKey, environment),
        ]);
        const [councilMint, communityMint] = await Promise.all([
            realm.account.config.councilMint
                ? this.heliusService.getTokenMintInfo(realm.account.config.councilMint, environment)
                : null,
            this.heliusService.getTokenMintInfo(realm.account.communityMint, environment),
        ]);
        const unsorted = await Promise.all(rawProposals.map(async (proposal) => {
            const mintInfo = realm.account.config.councilMint &&
                proposal.account.governingTokenMint.equals(realm.account.config.councilMint)
                ? councilMint
                : communityMint;
            const [governance, proposalVoteRecords] = await Promise.all([
                this.heliusService.getGovernance(proposal.account.governance, environment),
                this.heliusService.getVoteRecordsByProposal(proposal.pubkey, programId, environment),
            ]);
            const realmProposal = {
                author: {
                    publicKey: proposal.account.tokenOwnerRecord,
                },
                created: new Date(proposal.account.draftAt.toNumber() * 1000),
                document: await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(proposal.account.descriptionLink),
                description: proposal.account.descriptionLink,
                publicKey: proposal.pubkey,
                myVote: null,
                state: this.buildProposalState(proposal.account, governance.account),
                title: proposal.account.name,
                updated: this.buildPropsalUpdated(proposal.account),
                voteBreakdown: this.buildVotingBreakdown(proposal, proposalVoteRecords, governance.account, realm, mintInfo === null || mintInfo === void 0 ? void 0 : mintInfo.account),
            };
            return realmProposal;
        }));
        return unsorted;
    }
    async getProposalAddressesForRealm(realmPublicKey, environment) {
        const proposals = await this.getProposalsForRealmAndUser(realmPublicKey, null, pagination_1.RealmProposalSort.Time, environment);
        return proposals.map((p) => ({
            publicKey: p.publicKey,
            updated: p.updated,
        }));
    }
    async getProposalsForRealmAndUser(realmPublicKey, requestingUser, sortOrder, environment) {
        const [rawProposals, programId, realm] = await Promise.all([
            this.heliusService.getAllProposalsForRealm(realmPublicKey, environment),
            this.heliusService.getProgramId(realmPublicKey, environment),
            this.heliusService.getRealm(realmPublicKey, environment),
        ]);
        const voteRecords = requestingUser
            ? await this.heliusService.getVoteRecordsByVoter(programId, requestingUser, environment)
            : [];
        const [councilMint, communityMint] = await Promise.all([
            realm.account.config.councilMint
                ? this.heliusService.getTokenMintInfo(realm.account.config.councilMint, environment)
                : null,
            this.heliusService.getTokenMintInfo(realm.account.communityMint, environment),
        ]);
        const unsorted = await Promise.all(rawProposals.map(async (proposal) => {
            const mintInfo = realm.account.config.councilMint &&
                proposal.account.governingTokenMint.equals(realm.account.config.councilMint)
                ? councilMint
                : communityMint;
            const [governance, proposalVoteRecords] = await Promise.all([
                this.heliusService.getGovernance(proposal.account.governance, environment),
                this.heliusService.getVoteRecordsByProposal(proposal.pubkey, programId, environment),
            ]);
            const realmProposal = {
                author: {
                    publicKey: proposal.account.tokenOwnerRecord,
                },
                created: new Date(proposal.account.draftAt.toNumber() * 1000),
                document: await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(proposal.account.descriptionLink),
                description: proposal.account.descriptionLink,
                publicKey: proposal.pubkey,
                myVote: this.buildProposalUserVote(voteRecords.map((vr) => vr.account), proposal.pubkey.toBase58()),
                state: this.buildProposalState(proposal.account, governance.account),
                title: proposal.account.name,
                updated: this.buildPropsalUpdated(proposal.account),
                voteBreakdown: this.buildVotingBreakdown(proposal, proposalVoteRecords, governance.account, realm, mintInfo === null || mintInfo === void 0 ? void 0 : mintInfo.account),
            };
            return realmProposal;
        }));
        switch (sortOrder) {
            case pagination_1.RealmProposalSort.Alphabetical:
                return unsorted.slice().sort(this.sortAlphabetically);
            case pagination_1.RealmProposalSort.Relevance:
                return unsorted.slice().sort(this.sortRelevance);
            default:
                return unsorted.slice().sort(this.sortTime);
        }
    }
    async getProposalsForRealmAndUserByPublicKeys(realmPublicKey, publicKeys, requestingUser, environment) {
        const proposals = await this.getProposalsForRealmAndUser(realmPublicKey, requestingUser, pagination_1.RealmProposalSort.Alphabetical, environment);
        return proposals.reduce((acc, proposal) => {
            for (const key of publicKeys) {
                if (key.equals(proposal.publicKey)) {
                    acc[key.toBase58()] = proposal;
                }
            }
            return acc;
        }, {});
    }
    async getGoverningTokenMintsForHolaplexProposals(proposals, environment) {
        const mints = new Set([]);
        for (const proposal of proposals) {
            mints.add(proposal.account.governingTokenMint.toBase58());
        }
        const mintPks = Array.from(mints).map((address) => new web3_js_1.PublicKey(address));
        const mintInfos = await Promise.all(mintPks.map((mint) => this.heliusService.getTokenMintInfo(mint, environment)));
        const mintMapping = mintInfos.reduce((acc, mint) => {
            acc[mint.publicKey.toBase58()] = mint;
            return acc;
        }, {});
        return proposals.reduce((acc, proposal) => {
            acc[proposal.pubkey.toBase58()] = mintMapping[proposal.account.governingTokenMint.toBase58()];
            return acc;
        }, {});
    }
    buildVotingBreakdown(proposal, proposalVoteRecords, governance, realm, mint) {
        var _a, _b, _c, _d, _e;
        const decimals = (mint === null || mint === void 0 ? void 0 : mint.decimals) || 0;
        let percentThresholdMet = null;
        let threshold = null;
        let totalNoWeight = new bignumber_js_1.default(0);
        let totalYesWeight = new bignumber_js_1.default(0);
        let votingEndTime = null;
        let voteThresholdPercentage = 100;
        let totalPossibleWeight = new bignumber_js_1.default(0);
        if (proposal.account.noVotesCount && proposal.account.yesVotesCount) {
            totalYesWeight = new bignumber_js_1.default(proposal.account.yesVotesCount.toString());
            totalNoWeight = new bignumber_js_1.default(proposal.account.noVotesCount.toString());
        }
        else if (proposal.account.denyVoteWeight && ((_a = proposal.account.options) === null || _a === void 0 ? void 0 : _a.length)) {
            totalYesWeight = new bignumber_js_1.default(proposal.account.options[0].voteWeight.toString());
            totalNoWeight = new bignumber_js_1.default(proposal.account.denyVoteWeight.toString());
        }
        else {
            for (const voteRecord of proposalVoteRecords) {
                if (((_b = voteRecord.account.vote) === null || _b === void 0 ? void 0 : _b.toYesNoVote()) === spl_governance_1.YesNoVote.Yes &&
                    ((_c = voteRecord.account.voteWeight) === null || _c === void 0 ? void 0 : _c.yes)) {
                    totalYesWeight = totalYesWeight.plus(new bignumber_js_1.default(voteRecord.account.voteWeight.yes.toString()));
                }
                else if (((_d = voteRecord.account.vote) === null || _d === void 0 ? void 0 : _d.toYesNoVote()) === spl_governance_1.YesNoVote.No &&
                    ((_e = voteRecord.account.voteWeight) === null || _e === void 0 ? void 0 : _e.no)) {
                    totalNoWeight = totalNoWeight.plus(new bignumber_js_1.default(voteRecord.account.voteWeight.no.toString()));
                }
            }
        }
        if (governance.config.maxVotingTime) {
            const maxVotingTime = governance.config.maxVotingTime;
            const maxVotingTimeInMs = maxVotingTime * 1000;
            if (proposal.account.votingAt) {
                const start = new Date(proposal.account.votingAt.toNumber() * 1000);
                votingEndTime = start.getTime() + maxVotingTimeInMs;
            }
        }
        if ((governance === null || governance === void 0 ? void 0 : governance.config) &&
            realm.account.communityMint.equals(proposal.account.governingTokenMint) &&
            totalPossibleWeight &&
            mint) {
            totalPossibleWeight = realm.account.config.communityMintMaxVoteWeightSource.isFullSupply()
                ? new bignumber_js_1.default(mint.supply.toString())
                : realm.account.config.communityMintMaxVoteWeightSource.type ===
                    spl_governance_1.MintMaxVoteWeightSourceType.Absolute
                    ? new bignumber_js_1.default(realm.account.config.communityMintMaxVoteWeightSource.value.toString())
                    : new bignumber_js_1.default(realm.account.config.communityMintMaxVoteWeightSource.fmtSupplyFractionPercentage())
                        .multipliedBy(new bignumber_js_1.default(mint.supply.toString()))
                        .dividedBy(100);
        }
        if (totalPossibleWeight.isGreaterThan(0)) {
            voteThresholdPercentage =
                (realm.account.config.councilMint &&
                    proposal.account.governingTokenMint.equals(realm.account.config.councilMint)
                    ? governance.config.councilVoteThreshold.value
                    : governance.config.communityVoteThreshold.value) || 100;
            threshold = totalPossibleWeight.multipliedBy(voteThresholdPercentage / 100);
            percentThresholdMet = totalYesWeight.isGreaterThanOrEqualTo(threshold)
                ? 100
                : totalYesWeight.dividedBy(threshold).multipliedBy(100).toNumber();
        }
        return {
            percentThresholdMet,
            voteThresholdPercentage,
            threshold: threshold === null || threshold === void 0 ? void 0 : threshold.shiftedBy(-decimals),
            totalNoWeight: totalNoWeight.shiftedBy(-decimals),
            totalPossibleWeight: (totalPossibleWeight === null || totalPossibleWeight === void 0 ? void 0 : totalPossibleWeight.shiftedBy(-decimals)) || null,
            totalYesWeight: totalYesWeight.shiftedBy(-decimals),
            votingEnd: votingEndTime ? new Date(votingEndTime) : null,
        };
    }
    sortAlphabetically(a, b) {
        if (a.title && b.title) {
            return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
        }
        else if (a.title) {
            return -1;
        }
        else if (b.title) {
            return 1;
        }
        else {
            return a.publicKey.toBase58().localeCompare(b.publicKey.toBase58());
        }
    }
};
RealmProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, helius_service_1.HeliusService,
        realm_governance_service_1.RealmGovernanceService,
        realm_member_service_1.RealmMemberService,
        stale_cache_service_1.StaleCacheService])
], RealmProposalService);
exports.RealmProposalService = RealmProposalService;
//# sourceMappingURL=realm-proposal.service.js.map