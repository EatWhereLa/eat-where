import { Amplify, Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-southeast-1",
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT,
  },
});

export function useAuth() {
  async function login(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function signup(username: string, password: string, email: string) {
    try {
      const res = await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function confirmSignup(username: string, code: string) {
    try {
      const res = await Auth.confirmSignUp(username, code);
      console.log(res);
      return res;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return { login, signup, confirmSignup, logout };
}
