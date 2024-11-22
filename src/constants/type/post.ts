import { User } from "./user";

export interface Post {
  id?: number;
  title?: string;
  body?: string;
  author_id?: number;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}
