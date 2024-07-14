import { Stack, useRouter } from "expo-router";
import React from "react";
import CreateAccountPage from "../../modules/auth/components/createAccount/createAccount.component";

export default () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CreateAccountPage />
    </>
  );
};
