export interface Posts {
  postId: number;
  title: string;
  views: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export interface UserData {
  users: Users[];
  posts: Posts[];
}