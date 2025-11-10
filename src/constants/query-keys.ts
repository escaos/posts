export const queryKeys = {
  posts: () => ["posts", "list"] as const,
  post: (postId: number) => ["posts", postId, "detail"] as const,
  postComments: (postId: number) => ["posts", postId, "comments"] as const,
};
