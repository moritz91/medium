"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var UserInfo_1 = require("../../user/fragments/UserInfo");
exports.PostingInfoFragment = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment PostingInfo on Posting {\n    id\n    title\n    body\n    createdAt\n    creator {\n      ...UserInfo\n    }\n  }\n  ", "\n"], ["\n  fragment PostingInfo on Posting {\n    id\n    title\n    body\n    createdAt\n    creator {\n      ...UserInfo\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfoFragment);
var templateObject_1;
//# sourceMappingURL=PostingInfo.js.map