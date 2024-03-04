import { ThemeProvider } from "@/src/components/shadcn/ThemeProvider";
import { Toaster } from "@/src/components/shadcn/toaster";
import AuthContextProvider from "@/src/layout/AuthContextProvider";
import MainLayout from "@/src/layout/MainLayout";
import { cn } from "@/src/utilities/cn";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextComponentType } from "next";
import type { AppProps as NextAppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export type PageComponent = NextComponentType & {
  layout?: "auth" | "normal";
  title?: string;
};

interface AppProps extends NextAppProps {
  Component: PageComponent;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 20, // 5 minutes
          gcTime: 5, // 2 minutes
        },
      },
    })
  );
  return (
    <>
      <Head>
        <title>{`Empleo ${Component.title || pageProps.title || ""}`}</title>
  
      </Head>
      <main className={cn("font-sans", inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
              <MainLayout layout={Component?.layout || "normal"}>
                <Component {...pageProps} />
              </MainLayout>
              <Toaster />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </main>
    </>
  );
}
