import { baseApi } from "@/redux/api/baseApi";

type DashboardStats = {
  total_users: number;
  total_active_users: number;
  total_subscribers: number;
  total_scans: number;
};

type DashboardStatsResponse = DashboardStats | { data: DashboardStats };

export type DailyScanDay = {
  date: string;
  count: number;
};

type DailyScansResponse = {
  start_date: string;
  end_date: string;
  days: DailyScanDay[];
};

type WeekendWeeklyScansResponse = DailyScanDay[] | { data: DailyScanDay[] };

export type ScansTodayBucket = {
  start_hour: number;
  end_hour: number;
  label: string;
  count: number;
};

export type ScansTodayResponse = {
  date: string;
  buckets: ScansTodayBucket[];
};

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
    getWeekendWeeklyScans: builder.query<DailyScanDay[], number | void>({
      query: () => ({
        url: `/adminapi/scans/weekend-weekly/`,
        method: "GET",
      }),
      transformResponse: (
        response: WeekendWeeklyScansResponse | DailyScansResponse,
      ) => {
        if (Array.isArray(response)) return response;
        if ("days" in response && Array.isArray(response.days)) {
          return response.days;
        }
        return "data" in response ? (response.data ?? []) : [];
      },
    }),
    getScansTodayBuckets: builder.query<ScansTodayResponse, void>({
      query: () => ({
        url: "/adminapi/scans/today-3hours/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetWeekendWeeklyScansQuery,
  useGetScansTodayBucketsQuery,
} = dashboardApi;
