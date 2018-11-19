export interface User {
  _id: any;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  authenticate?: (password) => boolean;
}
