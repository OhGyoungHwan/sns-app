import { getServerSession } from "next-auth";
import MyPageComponent from "../components/template/MyPage";
import { authOptions } from "../lib/authOptions";
import AccessDenied from "../components/template/AccessDenied";

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <MyPageComponent />;
  }
  return <AccessDenied />;
}
