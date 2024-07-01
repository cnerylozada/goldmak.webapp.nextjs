"use server";

import { IBaseOrganization } from "@/models/models";

export const createOrganization = async (
  baseOrganization: IBaseOrganization
) => {
  const { creatorId, description, name } = baseOrganization;

  const response = await fetch(
    `http://localhost:3000/api/creators/${creatorId}/organizations`,
    {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};
