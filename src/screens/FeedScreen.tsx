import { useNavigation, useTheme } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { memo, useCallback, useMemo } from "react";
import {
  FlatList,
  type ListRenderItemInfo,
  Pressable,
  RefreshControl,
  View,
} from "react-native";

import type { Post } from "../api/types";
import { EmptyState } from "../components/feedback/empty-state";
import { ErrorState } from "../components/feedback/error-state";
import { Card } from "../components/ui/card";
import { Spinner } from "../components/ui/spinner";
import { Typography } from "../components/ui/typography";
import { usePosts, usePrefetchPost } from "../features/posts/queries";
import type { RootStackParamList } from "../navigation/types";

type FeedNavigation = NativeStackNavigationProp<RootStackParamList, "Feed">;

const ItemSeparator = () => <View className="h-3" />;

function createExcerpt(body: string, limit = 140) {
  const normalized = body.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) {
    return normalized;
  }

  return `${normalized.slice(0, limit)}…`;
}

type PostListItemProps = {
  onOpen(post: Post): void;
  post: Post;
};

const PostListItem = memo(({ post, onOpen }: PostListItemProps) => {
  const prefetchPost = usePrefetchPost(post.id);
  const excerpt = useMemo(() => createExcerpt(post.body), [post.body]);

  const handlePress = useCallback(() => {
    onOpen(post);
  }, [onOpen, post]);

  const handlePressIn = useCallback(() => {
    prefetchPost();
  }, [prefetchPost]);

  return (
    <Card className="overflow-hidden p-0">
      <Pressable
        accessibilityHint="Opens the post detail"
        accessibilityRole="button"
        className="active:opacity-95"
        onPress={handlePress}
        onPressIn={handlePressIn}
      >
        <View className="gap-3 p-6">
          <Typography variant="title">{post.title}</Typography>
          <Typography variant="body" className="text-slate-300">
            {excerpt}
          </Typography>
          <Typography variant="caption" className="text-primary">
            Read more →
          </Typography>
        </View>
      </Pressable>
    </Card>
  );
});

PostListItem.displayName = "PostListItem";

export function FeedScreen() {
  const navigation = useNavigation<FeedNavigation>();
  const { colors } = useTheme();
  const primaryColor = colors.primary ?? "#2563EB";
  const backgroundColor = colors.background ?? "#0f172a";
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    refetch,
    isRefetching,
  } = usePosts();

  const handleOpenPost = useCallback(
    (post: Post) => {
      navigation.navigate("PostDetail", {
        postId: post.id,
        post,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <PostListItem post={item} onOpen={handleOpenPost} />
    ),
    [handleOpenPost],
  );

  const keyExtractor = useCallback((item: Post) => item.id.toString(), []);

  const refreshControl = (
    <RefreshControl
      colors={[primaryColor]}
      progressBackgroundColor={backgroundColor}
      refreshing={isRefetching}
      tintColor={primaryColor}
      onRefresh={refetch}
    />
  );

  if (isLoading && !posts?.length) {
    return (
      <View className="flex-1 items-center justify-center bg-background-light px-6 dark:bg-background">
        <Spinner size="large" />
      </View>
    );
  }

  const showEmptyState = !posts?.length;

  return (
    <View className="flex-1 bg-background-light dark:bg-background">
      <FlatList
        data={posts ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={refreshControl}
        contentContainerStyle={
          showEmptyState
            ? {
                flexGrow: 1,
                padding: 24,
                alignItems: "center",
                justifyContent: "center",
              }
            : {
                padding: 16,
                paddingBottom: 32,
                gap: 12,
              }
        }
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          isError ? (
            <ErrorState
              message="We couldn't load posts from the server."
              onRetry={refetch}
              retryLabel="Retry"
            />
          ) : (
            <EmptyState />
          )
        }
        ListFooterComponent={
          isFetching && posts?.length ? <Spinner className="mt-6" /> : null
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
        windowSize={11}
      />
    </View>
  );
}
