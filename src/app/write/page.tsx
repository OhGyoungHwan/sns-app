import Write from "../components/template/Write";
import AccessDenied from "../components/template/AccessDenied";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <Write />;
  }
  return <AccessDenied />;
}
