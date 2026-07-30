"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsUnique", {
    enumerable: true,
    get: function() {
        return IsUnique;
    }
});
const _classvalidator = require("class-validator");
const _isuniqueconstraint = require("./constraint/is-unique-constraint");
function IsUnique(options, validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [
                options.model,
                options.field,
                options.excludeIdField
            ],
            validator: _isuniqueconstraint.IsUniqueConstraint
        });
    };
}

//# sourceMappingURL=is-unique-validators.js.map