import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component: any) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/signin");
      } else if (user && !user.verified) {
        router.push("/waiting-for-verification");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return null; // You could add a loading spinner here
    }

    return <Component {...props} />;
  };
};

export default withAuth;
