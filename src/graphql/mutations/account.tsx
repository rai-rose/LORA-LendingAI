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

const CREATE_ACCOUNT = gql`
  mutation CreateAccountWeb($data: CreateAccountAdminInput) {
    createAccountWeb(data: $data) {
      success
      message
      token
    }
  }
`;

export { LOGIN_ACCOUNT, CREATE_ACCOUNT };