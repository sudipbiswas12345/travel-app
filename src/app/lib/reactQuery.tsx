// "use client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode, useState } from "react";

// export default function ReactQueryProvider({ children }: { children: ReactNode }) {
//   const [client] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: { staleTime: 1000 * 60 * 2, retry: 1, refetchOnWindowFocus: false },
//     }
//   }));

//   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
// }
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
