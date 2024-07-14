import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { appRoutes } from "../routing/route.config";
import { authentificationSelector } from "../src/_slice/authentification/authentification.selector";
export default function Index() {
  const { isConnected } = useSelector(authentificationSelector);

  return <Redirect href={isConnected ? "/categories" : appRoutes.auth.root} />;
}
