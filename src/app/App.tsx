import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";
import { Toaster } from "@/lib/toast";
import { AuthProvider } from "@/lib/auth";
import { router } from "./router";

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </QueryClientProvider>
);
