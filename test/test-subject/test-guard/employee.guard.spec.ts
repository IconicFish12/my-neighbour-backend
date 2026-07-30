import { EmployeeGuard } from '../../../src/common/security/auth/guards/employee.guard';

describe('EmployeeGuard', () => {
  it('should be defined', () => {
    expect(new EmployeeGuard()).toBeDefined();
  });
});
