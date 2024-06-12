// import { useAppProvider } from "../../Context/AppContext";
import { useLoaderData } from "react-router-dom";
import { RootLayoutUseLoaderData } from "../../Helpers/Types/commonTypes";

function PublicRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useLoaderData() as RootLayoutUseLoaderData;

  if (isLoggedIn) {
    //   const { isLoggedIn } = useAppProvider();
    return null;
  }
  return children;
}

export default PublicRoute;
