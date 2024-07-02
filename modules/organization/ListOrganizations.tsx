"use client";

import { Organization } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const ListOrganizations = ({ creatorId }: { creatorId: string }) => {
  const getData = async () => {
    const response = await fetch(
      `/api/creators/${creatorId}/organizations?page=1`
    );
    const data = await response.json();
    return data;
  };

  const { data } = useQuery({
    queryKey: [`${creatorId}-organizations`],
    queryFn: getData,
  });

  console.log(data);
  return (
    <div>
      <div>
        {!!data &&
          data.map(
            (_: Organization & { resourceFiles: { bucketKey: string }[] }) => (
              <div key={_.id}>
                <div>{_.id}</div>
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
          )}
      </div>
    </div>
  );
};
