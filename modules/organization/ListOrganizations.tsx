"use client";

import { useQuery } from "@tanstack/react-query";

export const ListOrganizations = ({ creatorId }: { creatorId: string }) => {
  const getData = async () => {
    const response = await fetch(`/api/creators/${creatorId}/organizations`);
    const data = await response.json();
    return data;
  };

  const { data } = useQuery({ queryKey: ["organizations"], queryFn: getData });

  console.log(data);
  return (
    <div>
      {/* {dataResponse!.map((_) => (
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
        ))} */}
    </div>
  );
};
