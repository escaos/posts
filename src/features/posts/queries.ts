import { useCallback } from "react";
import {
  useQuery,
  useQueryClient,
  type DefaultError,
  type UseQueryResult,
} from "@tanstack/react-query";

import { fetchPost, fetchPostComments, fetchPosts } from "../../api/posts";
import type { Comment, Post } from "../../api/types";
import { queryKeys } from "../../constants/query-keys";
import { log } from "../../lib/logger";

export function usePosts(): UseQueryResult<Post[], DefaultError> {
  return useQuery({
    queryKey: queryKeys.posts(),
    queryFn: fetchPosts,
    select: (posts) => [...posts].sort((a, b) => b.id - a.id),
    onError: (error) => log(error, { scope: "usePosts" }),
  });
}

export function usePost(
  postId: number,
  initialData?: Post,
): UseQueryResult<Post, DefaultError> {
  return useQuery({
    queryKey: queryKeys.post(postId),
    queryFn: () => fetchPost(postId),
    initialData,
    enabled: Number.isFinite(postId),
    onError: (error) => log(error, { scope: "usePost", postId }),
  });
}

export function usePostComments(
  postId: number,
): UseQueryResult<Comment[], DefaultError> {
  return useQuery({
    queryKey: queryKeys.postComments(postId),
    queryFn: () => fetchPostComments(postId),
    enabled: Number.isFinite(postId),
    onError: (error) => log(error, { scope: "usePostComments", postId }),
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
import { useCallback } from 'react';
import {
  useQuery,
  useQueryClient,
  type DefaultError,
  type UseQueryResult,
} from '@tanstack/react-query';

import {
  fetchPost,
  fetchPostComments,
  fetchPosts,
} from '@/api/posts';
import type { Comment, Post } from '@/api/types';
import { queryKeys } from '@/constants/query-keys';
import { log } from '@/lib/logger';

export function usePosts(): UseQueryResult<Post[], DefaultError> {
  return useQuery({
    queryKey: queryKeys.posts(),
    queryFn: fetchPosts,
    select: posts => [...posts].sort((a, b) => b.id - a.id),
    onError: error => log(error, { scope: 'usePosts' }),
  });
}

export function usePost(
  postId: number,
  initialData?: Post,
): UseQueryResult<Post, DefaultError> {
  return useQuery({
    queryKey: queryKeys.post(postId),
    queryFn: () => fetchPost(postId),
    initialData,
    enabled: Number.isFinite(postId),
    onError: error => log(error, { scope: 'usePost', postId }),
  });
}

export function usePostComments(
  postId: number,
): UseQueryResult<Comment[], DefaultError> {
  return useQuery({
    queryKey: queryKeys.postComments(postId),
    queryFn: () => fetchPostComments(postId),
    enabled: Number.isFinite(postId),
    onError: error => log(error, { scope: 'usePostComments', postId }),
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

