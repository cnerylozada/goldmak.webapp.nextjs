"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getProductsByOrganization } from "./utils";
import Link from "next/link";

export const ListProducts = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [`${organizationId}-products`],
      queryFn: (props) => getProductsByOrganization(organizationId, props),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  return (
    <div>
      <div>{status === "pending" && <div>Loading...</div>}</div>
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
