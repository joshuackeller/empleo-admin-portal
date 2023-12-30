import { useRouter } from "next/router";

export const useQueryParam = (key: string, fallback?: string): string => {
  const router = useRouter();
  let item: string | string[] | undefined = router.query[key];
  if (typeof item === "string") {
    return item;
  } else if (Array.isArray(item)) {
    return item[0];
  } else if (fallback) {
    return fallback;
  } else {
    return "";
  }
};
