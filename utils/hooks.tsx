import { useInfiniteQuery } from "@tanstack/react-query";

export const useCustomInfiniteQuery = (
  queryKey: string,
  fetchFunction: any,
  mainEntityId: string
) => {
  const response = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: (props) => fetchFunction(mainEntityId, props),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
  return response;
};
