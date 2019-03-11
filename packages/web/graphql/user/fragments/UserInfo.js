"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.UserInfoFragment = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment UserInfo on User {\n    id\n    username\n    pictureUrl\n    bio\n  }\n"], ["\n  fragment UserInfo on User {\n    id\n    username\n    pictureUrl\n    bio\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=UserInfo.js.map