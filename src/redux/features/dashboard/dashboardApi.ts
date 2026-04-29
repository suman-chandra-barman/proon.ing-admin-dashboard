import { baseApi } from "@/redux/api/baseApi";

type DashboardStats = {
  total_users: number;
  total_active_users: number;
  total_subscribers: number;
  total_scans: number;
};

type DashboardStatsResponse = DashboardStats | { data: DashboardStats };

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({
        url: "/adminapi/dashboard/",
        method: "GET",
      }),
      transformResponse: (response: DashboardStatsResponse) =>
        "data" in response ? response.data : response,
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
