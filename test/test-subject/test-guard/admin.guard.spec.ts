import { AdminGuard } from '../../../src/common/security/auth/guards/admin.guard';

describe('AdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuard()).toBeDefined();
  });
});
