"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getOrganizationsByCreator } from "./utils";
import Link from "next/link";

export const ListOrganizations = ({ creatorId }: { creatorId: string }) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [`${creatorId}-organizations`],
      queryFn: (props) => getOrganizationsByCreator(creatorId, props),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  const existElements = data?.pages.map((_) => _.length)[0];

  return (
    <div>
      <div>{status === "pending" && <div>Loading...</div>}</div>
      <div>{!existElements && <div>There are no organizations</div>}</div>

      <div>
        {!!data &&
          data.pages.map((orgs) =>
            orgs.map((_) => (
              <div key={_.id}>
                <div>
                  <Link href={`./organizations/${_.id}`}>{_.id}</Link>
                </div>
                <div>{_.name}</div>
                <div>
                  <Image
                    src={`${_.resourceFiles[0].bucketKey}`}
                    width={180}
                    height={37}
                    alt={_.resourceFiles[0].bucketKey}
                  />
                </div>
                <div>{_.description}</div>
                <div>{_.createdAt.toString()}</div>
              </div>
            ))
          )}
      </div>
      <div>
        <button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
        >
          {isFetchingNextPage
            ? "Loading more ..."
            : hasNextPage
            ? "Load more"
            : "Nothing more to"}
        </button>
      </div>
    </div>
  );
};
