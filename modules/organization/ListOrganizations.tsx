"use client";

import Image from "next/image";
import { getOrganizationsByCreator } from "./utils";
import Link from "next/link";
import { useCustomInfiniteQuery } from "@/utils/hooks";
import { Organization } from "@prisma/client";

export const ListOrganizations = ({ creatorId }: { creatorId: string }) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCustomInfiniteQuery(
      `${creatorId}-organizations`,
      getOrganizationsByCreator,
      creatorId
    );

  const existElements = data?.pages.map((_) => _.length)[0];

  return (
    <div>
      <div>{status === "pending" && <div>Loading...</div>}</div>
      <div>{!existElements && <div>There are no organizations</div>}</div>

      <div className="space-y-4">
        {!!data &&
          data.pages.map((orgs) =>
            orgs.map(
              (
                _: Organization & {
                  resourceFiles: { bucketKey: string }[];
                }
              ) => (
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
