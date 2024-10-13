import * as IT from 'io-ts';
export declare const BrandedString: <N extends string>(name: N, refinement?: ((str: string) => boolean) | undefined) => IT.BrandC<IT.StringC, { readonly [x in N]: symbol; }>;
export declare const Nonce: IT.BrandC<IT.StringC, {
    readonly nonce: symbol;
}>;
export type Nonce = IT.TypeOf<typeof Nonce>;
