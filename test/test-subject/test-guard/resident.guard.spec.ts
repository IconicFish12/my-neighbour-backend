import { ResidentGuard } from '../../../src/common/security/auth/guards/resident.guard';

describe('ResidentGuard', () => {
  it('should be defined', () => {
    expect(new ResidentGuard()).toBeDefined();
  });
});
