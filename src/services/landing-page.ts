import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "./axiosInstance";
import { QUERY_KEY } from "@/contants/query-key";
import { API_ROUTES } from "@/contants/api-routes";

import { AxiosResponse } from "axios";
import { IReponseError } from "@/types/common";
import { IGetLandingPageResponse } from "@/types/landingPage";
export function useGetLandingPageList() {
  const { data, error, ...rest } = useQuery<
    AxiosResponse<IGetLandingPageResponse[]>,
    IReponseError
  >({
    queryKey: [QUERY_KEY.LANDING_PAGE],
    queryFn: async () => await Axios.get(API_ROUTES.LANDING_PAGE),
  });

  return {
    ...rest,
    landingPageList: data?.data,
    error: error?.error || "",
  };
}

export function useEditLandingPage() {
  const queryClient = useQueryClient();

  const { mutate: editLandingPage, isPending: isUpdatingLandingPage } =
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: number;
        data: Partial<IGetLandingPageResponse>;
      }) => await Axios.put(API_ROUTES.LANDING_PAGE_DETAIL(id), data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LANDING_PAGE],
        });
      },
    });

  return { editLandingPage, isUpdatingLandingPage };
}

export function useCreateLandingPage() {
  const queryClient = useQueryClient();

  const { mutate: createLandingPage, isPending: isCreatingLandingPage } =
    useMutation({
      mutationFn: async ({
        data,
      }: {
        data: Partial<IGetLandingPageResponse>;
      }) => await Axios.post(API_ROUTES.LANDING_PAGE, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LANDING_PAGE],
        });
      },
    });

  return { createLandingPage, isCreatingLandingPage };
}

export function useDeleteLandingPage() {
  const queryClient = useQueryClient();

  const { mutate: deleteLandingPage, isPending: isDeletingLandingPage } =
    useMutation({
      mutationFn: async ({ id }: { id: number }) =>
        await Axios.delete(API_ROUTES.LANDING_PAGE_DETAIL(id)),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LANDING_PAGE],
        });
      },
    });

  return { deleteLandingPage, isDeletingLandingPage };
}

export function useGetLandingPageKey(apiKey?: string) {
  const { data, error, ...rest } = useQuery<
    AxiosResponse<IGetLandingPageResponse>,
    IReponseError
  >({
    queryKey: [QUERY_KEY.LANDING_PAGE_KEY, apiKey],
    enabled: apiKey !== "",
    queryFn: async () =>
      await Axios.get(API_ROUTES.LANDING_PAGE_KEY, {
        headers: {
          "x-api-key": apiKey,
        },
      }),
  });

  return {
    ...rest,
    landingPageDetail: data?.data,
    error: error?.error || "",
  };
}
