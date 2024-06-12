import { useAppProvider } from "../../Context/AppContext";

function PublicRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useAppProvider();

  if (isLoggedIn) {
    return null;
  }
  return children;
}

export default PublicRoute;
