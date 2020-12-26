import axios from "axios";

import { UserInCreate, Token, UserInLogin } from "./types";

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

export const loginUser = async (u: UserInLogin): Promise<Token> => {
  const bodyFormData = new FormData();
  bodyFormData.append("username", u.username);
  bodyFormData.append("password", u.password);

  try {
    const { data } = await axios.post(
      `http://localhost:8000/auth/token/`,
      bodyFormData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return convertJsonToToken(data);
  } catch (error) {
    throw Error("Not able to login.");
  }
};

const convertJsonToToken = ({ access_token, token_type }: any): Token => ({
  accessToken: access_token,
  tokenType: token_type,
});
