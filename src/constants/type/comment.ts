import { User } from "./user";

export interface Comment {
  id: number;
  body: string;
  post_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user?: User;
}
