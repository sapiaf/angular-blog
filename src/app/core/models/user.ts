export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  penName: string;
  role: Role;
  posts: string[];
  comments: string[];
  constructor(user: Partial<User>) {
    this.id = user.id || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.username = user.username || '';
    this.password = user.password || '';
    this.penName = user.penName || '';
    this.role = user.role || Role.LETTORE;
    this.posts = user.posts || [];
    this.comments = user.comments || [];
  }
}

export enum Role {
  'ADMIN',
  'LETTORE',
  'SCRITTORE',
}
