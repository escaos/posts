import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";

import type { Comment } from "../api/types";
import { EmptyState } from "../components/feedback/empty-state";
import { ErrorState } from "../components/feedback/error-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Spinner } from "../components/ui/spinner";
import { Typography } from "../components/ui/typography";
import { usePost, usePostComments } from "../features/posts/queries";
import type { RootStackParamList } from "../navigation/types";

type DetailRoute = RouteProp<RootStackParamList, "PostDetail">;

const CommentItem = memo(({ comment }: { comment: Comment }) => {
  return (
    <View className="rounded-2xl border border-muted/40 bg-slate-900/50 p-4">
      <Typography variant="subtitle" className="text-slate-100">
        {comment.name}
      </Typography>
      <Typography variant="caption" className="mt-1 text-slate-400">
        {comment.email}
      </Typography>
      <Typography variant="body" className="mt-3 leading-6 text-slate-200">
        {comment.body}
      </Typography>
    </View>
  );
});

CommentItem.displayName = "CommentItem";

export function PostDetailScreen() {
  const {
    params: { postId, post: initialPost },
  } = useRoute<DetailRoute>();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    refetch: refetchPost,
  } = usePost(postId, initialPost);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    refetch: refetchComments,
  } = usePostComments(postId);

  const handleRetry = useCallback(() => {
    refetchPost();
    refetchComments();
  }, [refetchComments, refetchPost]);

  if (isPostLoading && !post) {
    return (
      <View className="flex-1 items-center justify-center bg-background-light px-6 dark:bg-background">
        <Spinner size="large" />
      </View>
    );
  }

  if (isPostError || !post) {
    return (
      <View className="flex-1 items-center justify-center bg-background-light px-6 dark:bg-background">
        <ErrorState
          message="We couldn't load this post."
          onRetry={handleRetry}
        />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background-light dark:bg-background"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 32,
        gap: 16,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>Author #{post.userId}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="body" className="leading-6">
            {post.body}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>
            {comments?.length
              ? `${comments.length} responses`
              : "Join the conversation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          {isCommentsLoading && !comments?.length ? <Spinner /> : null}

          {isCommentsError ? (
            <ErrorState
              message="We couldn't load comments."
              onRetry={refetchComments}
              retryLabel="Retry comments"
            />
          ) : null}

          {!isCommentsLoading && !isCommentsError && !comments?.length ? (
            <EmptyState
              title="No comments yet"
              description="Start the discussion by leaving the first comment."
            />
          ) : null}

          {comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
}
