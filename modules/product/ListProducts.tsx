"use client";

import Image from "next/image";
import { getProductsByOrganization } from "./utils";
import Link from "next/link";
import { useCustomInfiniteQuery } from "@/utils/hooks";
import { Product } from "@prisma/client";

export const ListProducts = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCustomInfiniteQuery(
      `${organizationId}-products`,
      getProductsByOrganization,
      organizationId
    );

  const existElements = data?.pages.map((_) => _.length)[0];

  return (
    <div>
      <div>{status === "pending" && <div>Loading...</div>}</div>
      <div>{!existElements && <div>There are no products</div>}</div>
      <div>
        {!!data &&
          data.pages.map((orgs) =>
            orgs.map(
              (
                _: Product & {
                  resourceFiles: { bucketKey: string }[];
                }
              ) => (
                <div key={_.id}>
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
              )
            )
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
