import { createAccountModel } from "@/src/models/createAccount.model";
import axios from "axios";
import config from "../../../config.json";

const endpointUrl = config.local.baseUrl;

// login function
export const logConnectionApi = async (email: string, password: string) => {
  const url = `${endpointUrl}/graphql`;

  const queryVariables = {
    loginUserData: {
      email: email,
      password: password,
    },
  };

  const response = await axios.post(url, {
    query: `
      query Query($loginUserData: LoginUserInput!) {
        loginUser(loginUserData: $loginUserData)
        }
      `,
    variables: queryVariables,
  });

  return response.data.data.loginUser as string;
};

// create new user
export const createAccountApi = async (data: createAccountModel) => {
  const url = `${endpointUrl}/graphql`;

  console.log(data);

  const mutationVariables = {
    createUserData: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  };

  console.log(mutationVariables);

  const response = await axios.post(url, {
    query: `
      mutation Mutation($createUserData: CreateUserInput!) {
        createUser(createUserData: $createUserData)
      }
      `,
    variables: mutationVariables,
  });

  return response.data.createUser;
};
