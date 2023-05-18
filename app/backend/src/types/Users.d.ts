type Roles = 'admin' | 'user' | string;

export default interface UserInterface {
  id: number;
  username: string;
  role: Roles;
  email: string;
  password?: string;
}
