import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/const/routes";
import { useSession } from "next-auth/react";
import { AUTHENTICATED } from "@/const";

const useRedirectIfAuthenticated = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === AUTHENTICATED) {
      router.replace(ADMIN_DASHBOARD);
      return;
    }
  }, [router, status]);
};

export default useRedirectIfAuthenticated;
