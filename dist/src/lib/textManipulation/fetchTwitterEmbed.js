"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTwitterEmbed = void 0;
const cacheAndDedupe_1 = require("../cacheAndDedupe");
const RichTextDocument_1 = require("../types/RichTextDocument");
exports.fetchTwitterEmbed = (0, cacheAndDedupe_1.dedupe)(async (url, bearerToken) => {
    const parts = [
        `url=${encodeURIComponent(url)}`,
        'omit_script=1',
        'dnt=true',
    ];
    const resp = await fetch(`https://publish.twitter.com/oembed?${parts.join('&')}`, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        }
    });
    const data = await resp.json();
    const node = {
        t: RichTextDocument_1.BlockNodeType.TwitterEmbed,
        c: {
            u: data.url,
            t: data.title,
            h: data.html,
        }
    };
    return node;
}, {
    key: (url, token) => url + token,
});
//# sourceMappingURL=fetchTwitterEmbed.js.map