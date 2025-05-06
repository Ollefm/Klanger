export type AppUser = {
  uid: string;
  email: string;
  username: string;
  createdAt: Date;
};

export type SignUpData = {
  email: string;
  password: string;
  username: string;
};
