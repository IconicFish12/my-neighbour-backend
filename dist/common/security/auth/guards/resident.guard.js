/* eslint-disable @typescript-eslint/no-unused-vars */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResidentGuard", {
    enumerable: true,
    get: function() {
        return ResidentGuard;
    }
});
const _common = require("@nestjs/common");
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
let ResidentGuard = class ResidentGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        // const user = request.user; // Data user dari JWT Strategy
        // return user && user.role === UserRole.RESIDENT;
        return true;
    }
};
ResidentGuard = _ts_decorate([
    (0, _common.Injectable)()
], ResidentGuard);

//# sourceMappingURL=resident.guard.js.map