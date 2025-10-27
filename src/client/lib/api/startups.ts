import { apiCall } from "./client";
import { Startup, CreateStartupInput } from "../types";

export const startupApi = {
  async getAll(): Promise<Startup[]> {
    return apiCall<Startup[]>("/startups");
  },

  async getById(id: string): Promise<Startup> {
    return apiCall<Startup>(`/startups/${id}`);
  },

  async getByOwner(ownerWallet: string): Promise<Startup[]> {
    return apiCall<Startup[]>(`/startups?owner=${ownerWallet}`);
  },

  async create(input: CreateStartupInput): Promise<Startup> {
    return apiCall<Startup>("/startups", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async update(
    id: string,
    input: Partial<CreateStartupInput>
  ): Promise<Startup> {
    return apiCall<Startup>(`/startups/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },
};
