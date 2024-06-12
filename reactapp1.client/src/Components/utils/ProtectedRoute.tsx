import { useLoaderData } from "react-router-dom";
import { RootLayoutUseLoaderData } from "../../Helpers/Types/commonTypes";

function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useLoaderData() as RootLayoutUseLoaderData;
  const data = useLoaderData();
  console.log(data);
  if (!isLoggedIn) {
    return null;
  }
  return children;
  //   const { isLoggedIn } = useAppProvider();
  //   if (!isLoggedIn) {
  //     return null;
  //   }
  //   return children;
}

export default ProtectedRoute;
