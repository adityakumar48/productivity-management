import { useSession } from "next-auth/react";
import TodoHomepage from "../task/page";
import DashboardLoading from "./loading";
import LandingPage from "../components/LandingPage/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // const { data: session, status } = useSession();
  const session = await getServerSession(authOptions);

  // if (status == "loading") return <DashboardLoading />;

  return <>{session?.user ? <TodoHomepage /> : <LandingPage />}</>;
}
