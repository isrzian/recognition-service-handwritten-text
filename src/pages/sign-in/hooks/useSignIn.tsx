//import { Routes } from "@/lib/consts";
import { useMutation } from "@tanstack/react-query";
//import { useNavigate } from "react-router-dom";

export interface SignInRequestData {
  email: string;
  password: string;
}

// Функция для авторизации пользователя
const signInRequest = async (data: SignInRequestData) => {
  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const cookie = getCookie('csrftoken')

  const response = await fetch('http://45.12.230.37/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': cookie === null ? '' : cookie
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const result = await response.json();
  return result;
};

export const useSignIn = () => {

  const { isPending, mutate } = useMutation<any, Error, SignInRequestData>({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
        console.log(data.redirect_url);
      } else {
        console.error('No redirect_url in response');
      }
    },
    onError: (error) => {
      console.error('Error during login:', error);
    }
  });

  return {
    isPending,
    signIn: mutate,
  };
};


//export const useSignIn = () => {
//  const navigate = useNavigate();
//
//  const { isPending, mutate } = useMutation({
//    mutationFn: (data: SignInRequestData) => {
//      return new Promise((res) => setTimeout(() => res(data), 3000));
//    },
//    onSuccess: () => {
//      navigate({ pathname: Routes.recognition });
//    },
//  });
//
//  return {
//    isPending,
//    signIn: mutate,
//  };
//};
