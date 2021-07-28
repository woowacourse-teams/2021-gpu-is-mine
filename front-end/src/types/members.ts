export interface MemberSignupRequest {
  email: string;
  labId: number;
  memberType: "manager" | "user";
  name: string;
  password: string;
}
