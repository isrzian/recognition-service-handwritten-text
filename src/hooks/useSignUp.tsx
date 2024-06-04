import { useMutation } from "@tanstack/react-query";
import { RegisterDto, RegisterService } from "@/api";
import { useSignIn } from "./useSignIn";

export const useSignUp = () => {
  const { isPending: isPendingSignUp, signIn } = useSignIn();

  const { isPending: isPendingSignIn, mutate } = useMutation({
    mutationFn: (data: RegisterDto) => RegisterService.registerCreate(data),
    onSuccess: (_, signUpData) => {
      signIn({
        email: signUpData.email,
        password: signUpData.password,
      });
    },
  });

  return {
    isPending: isPendingSignIn || isPendingSignUp,
    signUp: mutate,
  };
};
