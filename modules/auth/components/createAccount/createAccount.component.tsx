import { createAccount } from "@/src/_slice/authentification/authentification.slice";
import { createAccountModel } from "@/src/models/createAccount.model";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import AuthButton from "../../../../components/shared/authButton";
import Input from "../../../../components/shared/input";
import { appRoutes } from "../../../../routing/route.config";
import { Box, Text } from "../../../../utils/theme";

export default function CreateAccountPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<any, "name">>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const onLogInPress = () => {
    router.navigate(appRoutes.auth.root);
  };

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    const newUser: createAccountModel = {
      email: email,
      password: password,
      name: username,
    };
    dispatch(createAccount({ data: newUser }));

    console.log("valeur", newUser);
  };

  return (
    <View style={styles.container}>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="text2Xl" fontWeight="600">
          Welcome to Planify!
        </Text>
        <Text variant="text2Xl" fontWeight="600">
          Your journey starts here
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your username"
              error={errors.username}
            />
          )}
          name="username"
        />
        <Box mb="3" />
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
        <Box mb="3" />
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
        <Box mb="3" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm your password"
              error={errors.confirmedPassword}
              secureTextEntry
            />
          )}
          name="confirmedPassword"
        />
        <Box mb="10" />
        <AuthButton
          label="Sign up"
          uppercase
          onPress={handleSubmit(onSubmit)}
        />
        <Box mb="5.5" />
        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={onLogInPress}>
            <Text color="purple900">Log in?</Text>
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
