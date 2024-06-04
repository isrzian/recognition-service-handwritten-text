import { LoginDto, LoginService } from "@/api";
import { useAuth } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: LoginDto) => LoginService.loginCreate(data),
    onSuccess: (response) => {
      setIsAuth(true);
      navigate({ pathname: response.redirect_url });
    },
  });

  const test = async (data: LoginDto) => {
    const res = await fetch("http://45.12.230.37/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const cookies = res.headers.getSetCookie();
    console.log(cookies);
  };

  return {
    isPending,
    signIn: mutate,
  };
};
