import { baseApi } from "@/redux/api/baseApi";
import { setCredentials } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login/",
        method: "POST",
        body: userInfo,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data?.data?.access;
          if (token) {
            localStorage.setItem("accessToken", token);
            dispatch(setCredentials({ user: data.data.user, token }));
          } else {
            console.warn("No access token found in login response:", data);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // SIGNUP
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    // EMAIL VERIFICATION
    emailVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const token = data?.data?.access;
          if (token) {
            localStorage.setItem("accessToken", token);
            dispatch(setCredentials({ user: data.data.user ?? null, token }));
          } else {
            console.warn(
              "No access token found in verification response:",
              data,
            );
          }
        } catch (error) {
          console.error("Email verification failed:", error);
        }
      },
    }),

    // RESEND OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // FORGOT PASSWORD
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),

    // VERIFY OTP
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
    }),

    // UPDATE PASSWORD (logged-in user)
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
    }),

    // UPDATE PROFILE
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    // CHANGE PASSWORD (for logged-in user)
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    //  GET CURRENT USER
    getMe: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem("accessToken");

          if (token) {
            dispatch(setCredentials({ user: data.data, token }));
          }
        } catch (err) {
          console.error("Get user info failed:", err);
        }
      },
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useEmailVerifyMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetMeQuery,
} = authApi;
