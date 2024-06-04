import { ChangePasswordDto, ProfileService, UpdateUserDto } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdatedProfileData = UpdateUserDto & ChangePasswordDto;

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isProfileBaseDataPending,
    mutateAsync: mutateProfileBaseData,
  } = useMutation({
    mutationKey: ["profile-update"],
    mutationFn: ProfileService.profileUpdateUserUpdate,
  });

  const {
    isPending: isProfilePasswordPending,
    mutateAsync: mutateProfilePasswordData,
  } = useMutation({
    mutationFn: ProfileService.profileChangePasswordCreate,
  });

  const updateProfileData = async (updatedProfileData: UpdatedProfileData) => {
    await mutateProfileBaseData(updatedProfileData);
    await mutateProfilePasswordData(updatedProfileData);
    queryClient.invalidateQueries({ queryKey: ["viewer"] });
  };

  return {
    isProfileDataPending: isProfileBaseDataPending || isProfilePasswordPending,
    updateProfileData,
  };
};
