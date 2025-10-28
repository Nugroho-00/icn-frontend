"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { queryClient } from "@/lib/query-client";
// import { useEffect } from "react";

const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       throwOnError: true,
//       // onError: (error: any) => {
//       //   handleGlobalError(error);
//       // },
//     },
//     mutations: {
//       onError: (error: any) => {
//         handleGlobalError(error);
//       },
//     },
//   },
});

// function handleGlobalError(error: any) {
//   const status = error?.response?.status;
//   console.log("Global error handler triggered with status:", status);

//   if (status === 401) {
//     console.warn("Unauthorized! Redirecting to login...");
//     if (typeof window !== "undefined") {
//       // Hapus cookie/token kalau perlu
//       document.cookie = "access_token=; Max-Age=0; path=/;";
//       window.location.href = "/auth/login";
//     }
//   }
// }


export function QueryProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     // ✅ Tangkap semua error dari Query dan Mutation secara global
//     const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
//       if (event.type === "error") {
//         handleGlobalError(event.error);
//       }
//     });

//     // ✅ Tangkap juga dari Mutation Cache
//     const unsubscribeMutation = queryClient
//       .getMutationCache()
//       .subscribe((event) => {
//         if (event.type === "error") {
//           handleGlobalError(event.error);
//         }
//       });

//     return () => {
//       unsubscribe();
//       unsubscribeMutation();
//     };
//   }, [queryClient]);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
