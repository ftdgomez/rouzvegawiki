import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const Protected = ({ children }) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session === null) {
            router.push("/collaborate");
        }
    }, [session]);

    if (session) {
        return <>{children}</>;
    }

    return <p>...</p>;
}