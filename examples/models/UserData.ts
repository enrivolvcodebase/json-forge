export interface UserDataPostsItem {
  postId: number;
  title: string;
  views: number;
}

export interface UserDataUsersItem {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export interface UserData {
  users: UserDataUsersItem[];
  posts: UserDataPostsItem[];
}