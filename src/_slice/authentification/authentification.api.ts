import axios from "axios";
import config from "../../../config.json";

const endpointUrl = config.local.baseUrl;

export const logConnectionApi = async () => {
  const url = `${endpointUrl}/graphql`;

  const queryVariables = {};

  const response = await axios.post(url, {
    query: `
      `,
    variables: queryVariables,
  });

  return response.data;
};
