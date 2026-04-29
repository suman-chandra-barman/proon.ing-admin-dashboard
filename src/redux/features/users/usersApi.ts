import { baseApi } from "@/redux/api/baseApi";

export interface AdminUser {
  id: string;
  username: string;
  email: string | null;
  subscription_plan: string;
  status: string;
  total_scan: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<AdminUser[], void>({
      query: () => "/adminapi/users/",
      providesTags: (result) =>
        result
          ? [
              { type: "AdminUsers", id: "LIST" },
              ...result.map((user) => ({
                type: "AdminUsers" as const,
                id: user.id,
              })),
            ]
          : [{ type: "AdminUsers", id: "LIST" }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/adminapi/users/${userId}/remove/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: "AdminUsers", id: "LIST" },
        { type: "AdminUsers", id: userId },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;
