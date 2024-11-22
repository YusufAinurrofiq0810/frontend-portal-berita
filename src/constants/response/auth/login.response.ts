import { User } from "@/constants/type/user";

export interface ResultLogin {
  user: User;
  token: string;
}
