import { gql } from "@apollo/client";

const LOGIN_ACCOUNT = gql`
  mutation LoginAccountWeb($email: String, $password: String) {
    loginAccountWeb(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;

export { LOGIN_ACCOUNT };