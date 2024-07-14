import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AuthButton from "../../../../components/shared/authButton";
import Input from "../../../../components/shared/input";
import { appRoutes } from "../../../../routing/route.config";
import { Box, Text } from "../../../../utils/theme";

export default function LoginPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<any, "name">>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Omit<any, "name">) => {
    const { email, password } = data;
    console.log("valeur", email, password);
  };

  const navigateToSignUp = () => {
    router.navigate(appRoutes.auth.createAccount);
  };

  return (
    <View style={styles.container}>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="text2Xl" fontWeight="600">
          Hey,
        </Text>
        <Text variant="text2Xl" fontWeight="600">
          Welcome Back
        </Text>
        <Box mb="12" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mb="10" />
        <AuthButton label="Login" uppercase onPress={handleSubmit(onSubmit)} />
        <Box mb="5.5" />
        <View style={styles.footer}>
          <Text>Don’t have an account?</Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text color="purple900">Sign up</Text>
          </TouchableOpacity>
        </View>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
