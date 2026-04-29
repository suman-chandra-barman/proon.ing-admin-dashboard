import { baseApi } from "@/redux/api/baseApi";

export type ScanActivity = {
  id: string;
  user: string;
  user_name: string | null;
  user_email: string | null;
  mode: string;
  detected_label: string;
  confidence: number;
  created_at: string;
};

export const scansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getScans: builder.query<ScanActivity[], void>({
      query: () => ({
        url: "/adminapi/scans/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetScansQuery } = scansApi;
