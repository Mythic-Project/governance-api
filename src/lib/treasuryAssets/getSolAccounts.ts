import type { PublicKey } from "@solana/web3.js";

/**
 * Return a list of sol accounts. The data is fetched directly from the chain
 * through RPC.
 */
export function getSolAccounts(owners: PublicKey[], commitment?: string) {
  return fetch(process.env.RPC_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      owners.map((pk) => ({
          jsonrpc: '2.0',
          id: 1,
          method: 'getAccountInfo',
          params: [
            pk.toBase58(),
            {
              commitment,
              encoding: 'jsonParsed',
            },
          ],
        })),
    ),
  }).then<
    {
      result: {
        value: null | {
          data: any[];
          executable: boolean;
          lamports: number;
          owner: string;
          rentEpoch: number;
        };
      }[];
    }[]
  >((resp) => resp.json())
  .then(resp => resp.map(({ result }) => result).flat())
  .then(results => results.map((result, i) => ({
    ...result,
    owner: owners[i],
  })))
}
