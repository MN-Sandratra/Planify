import { Stack } from "expo-router";
import React from "react";

export default () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
