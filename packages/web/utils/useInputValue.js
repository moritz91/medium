"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useInputValue(initialValue) {
    var _a = react_1.useState(initialValue), value = _a[0], setValue = _a[1];
    var onChange = react_1.useCallback(function (event) {
        setValue((event.currentTarget || event.target).value);
    }, []);
    return [value, onChange];
}
exports.useInputValue = useInputValue;
//# sourceMappingURL=useInputValue.js.map