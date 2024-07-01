"use server";

import { IBaseOrganization } from "@/models/models";

export const createOrganization = async (
  baseOrganization: IBaseOrganization,
  host: string
) => {
  const { creatorId, description, name } = baseOrganization;

  const query = await fetch(`${host}/api/creators/${creatorId}/organizations`, {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await query.json();
  return response;
};
