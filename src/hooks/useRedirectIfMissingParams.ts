import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useRedirectIfMissingParams = (requiredParams: string[]) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const missingParam = requiredParams.some((param) => {
      const value = searchParams.get(param);
      return !value || value.trim() === "";
    });

    if (missingParam) {
      router.push("/");
    }
  }, [searchParams, router, requiredParams]);
};

export default useRedirectIfMissingParams;
