import { ProfileService } from "@/api";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export type ViewerType = {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
};

export const useViewer = () => {
  const { isAuth } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["viewer"],
    queryFn: ProfileService.profileRetrieve,
    enabled: isAuth,
  });

  return {
    viewerData: {
      id: data?.id,
      email: data?.email,
      firstName: data?.first_name,
      lastName: data?.last_name,
      middleName: data?.middle_name,
    },
    isLoadingViewer: isLoading,
  };
};
