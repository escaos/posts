import {
  type DefaultError,
  type UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

import { fetchPost, fetchPostComments, fetchPosts } from "../../api/posts";
import type { Comment, Post } from "../../api/types";
import { queryKeys } from "../../constants/query-keys";

export function usePosts(): UseQueryResult<Post[], DefaultError> {
  return useQuery<Post[], DefaultError>({
    queryKey: queryKeys.posts(),
    queryFn: fetchPosts,
    select: (posts) => [...posts].sort((a, b) => b.id - a.id),
  });
}

export function usePost(
  postId: number,
  initialData?: Post,
): UseQueryResult<Post, DefaultError> {
  return useQuery<Post, DefaultError>({
    queryKey: queryKeys.post(postId),
    queryFn: () => fetchPost(postId),
    enabled: Number.isFinite(postId),
    ...(initialData ? { initialData } : {}),
  });
}

export function usePostComments(
  postId: number,
): UseQueryResult<Comment[], DefaultError> {
  return useQuery<Comment[], DefaultError>({
    queryKey: queryKeys.postComments(postId),
    queryFn: () => fetchPostComments(postId),
    enabled: Number.isFinite(postId),
  });
}

export function usePrefetchPost(postId: number) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    if (!Number.isFinite(postId)) {
      return;
    }

    queryClient.prefetchQuery({
      queryKey: queryKeys.post(postId),
      queryFn: () => fetchPost(postId),
      staleTime: 60_000,
    });

    queryClient.prefetchQuery({
      queryKey: queryKeys.postComments(postId),
      queryFn: () => fetchPostComments(postId),
      staleTime: 60_000,
    });
  }, [postId, queryClient]);
}
