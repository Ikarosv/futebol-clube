type Roles = 'admin' | 'user';

export default interface UserInterface {
  id: number;
  username: string;
  role: Roles;
  email: string;
  password?: string;
}
