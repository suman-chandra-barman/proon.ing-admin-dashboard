import { baseApi } from "@/redux/api/baseApi";

export interface AdminSubscription {
  user: string;
  user_name: string;
  email: string | null;
  purchased_subscription_plan: string;
  status: string;
  amount: string;
  billing_period: string;
}

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<AdminSubscription[], void>({
      query: () => "/adminapi/subscriptions/",
    }),
  }),
});

export const { useGetSubscriptionsQuery } = subscriptionsApi;
