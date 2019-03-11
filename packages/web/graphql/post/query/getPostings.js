"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var PostingInfo_1 = require("../fragments/PostingInfo");
exports.getPostingsQuery = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getPostings($input: FindPostingsInput!) {\n    findPostings(input: $input) {\n      posts {\n        ...PostingInfo\n      }\n      hasMore\n    }\n  }\n  ", "\n"], ["\n  query getPostings($input: FindPostingsInput!) {\n    findPostings(input: $input) {\n      posts {\n        ...PostingInfo\n      }\n      hasMore\n    }\n  }\n  ", "\n"])), PostingInfo_1.PostingInfoFragment);
var templateObject_1;
//# sourceMappingURL=getPostings.js.map