import { get } from "./http";
import type { Comment, Post } from "./types";

export async function fetchPosts() {
  const posts = await get<Post[]>("/posts");
  return posts;
}

export async function fetchPost(postId: number) {
  const post = await get<Post>(`/posts/${postId}`);
  return post;
}

export async function fetchPostComments(postId: number) {
  const comments = await get<Comment[]>(`/posts/${postId}/comments`);
  return comments;
}
import { get } from './http';
import type { Comment, Post } from './types';

export async function fetchPosts() {
  const posts = await get<Post[]>('/posts');
  return posts;
}

export async function fetchPost(postId: number) {
  const post = await get<Post>(`/posts/${postId}`);
  return post;
}

export async function fetchPostComments(postId: number) {
  const comments = await get<Comment[]>(`/posts/${postId}/comments`);
  return comments;
}

