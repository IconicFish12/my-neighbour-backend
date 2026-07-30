import { PropertyManagerGuard } from '../../../src/common/security/auth/guards/property-manager.guard';

describe('PropertyManagerGuard', () => {
  it('should be defined', () => {
    expect(new PropertyManagerGuard()).toBeDefined();
  });
});
