import axios from "axios";

import { UserInCreate, Token } from "./types";

export const registerUser = async (u: UserInCreate): Promise<Token> => {
  try {
    const { data } = await axios.post(`http://localhost:8000/auth/users/`, {
      ...u,
    });
    return convertJsonToToken(data);
  } catch (error) {
    throw Error("Not able to register the user.");
  }
};

const convertJsonToToken = ({ access_token, token_type }: any): Token => ({
  accessToken: access_token,
  tokenType: token_type,
});
