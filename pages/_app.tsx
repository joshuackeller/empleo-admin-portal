import AuthContextProvider from "@/src/layout/AuthContextProvider";
import MainLayout from "@/src/layout/MainLayout";
import { cn } from "@/src/utilities/cn";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextComponentType } from "next";
import type { AppProps as NextAppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export type PageComponent = NextComponentType & {
  layout?: "auth" | "normal";
};

interface AppProps extends NextAppProps {
  Component: PageComponent;
  pageProps: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn("font-sans", inter.variable)}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <MainLayout layout={Component?.layout || "normal"}>
            <Component {...pageProps} />
          </MainLayout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthContextProvider>
    </main>
  );
}
