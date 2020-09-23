export interface CurrentUserModel {
  Email: string;
  Expiration: string;
  Id: number;
  IsEmailAuthenticationGuestUser: boolean;
  IsHiddenInUI: boolean;
  IsShareByEmailGuestUser: boolean;
  IsSiteAdmin: boolean;
  LoginName: string;
  PrincipalType: number;
  Title: string;
  UserId: IUserId;
  UserPrincipalName: string;
}

interface IUserId {
  NameId: string;
  NameIdIssuer: string;
}
