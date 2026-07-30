export class SignInRespones {
  user: {
    id: string;
    username: string;
    primaryEmail: string;
    fullName: string;
    role: string;
  };
  resident?: {
    id: string;
    residentStatus: string;
    familyCode?: string;
    registrationStatus: string;
  };
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
}
