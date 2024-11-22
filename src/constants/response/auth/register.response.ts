interface NewUser {
  name: string;
  email: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface ResultRegister {
  new_user: NewUser;
  token: string;
}
