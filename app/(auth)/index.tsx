import { Stack } from "expo-router";
import React from "react";
import LoginPage from "../../modules/auth/components/login/login.component";

export default () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <LoginPage />
  </>
);
