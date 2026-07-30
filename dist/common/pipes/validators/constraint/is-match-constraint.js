/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsMatchConstraint", {
    enumerable: true,
    get: function() {
        return IsMatchConstraint;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsMatchConstraint = class IsMatchConstraint {
    validate(value, validationArguments) {
        const [relatedPropertyName] = validationArguments.constraints;
        return value === validationArguments.object[relatedPropertyName];
    }
    defaultMessage(validationArguments) {
        const [relatedPropertyName] = validationArguments.constraints;
        return `${validationArguments.property} must match with ${relatedPropertyName} exactly`;
    }
};
IsMatchConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        name: 'match',
        async: true
    }),
    (0, _common.Injectable)()
], IsMatchConstraint);

//# sourceMappingURL=is-match-constraint.js.map