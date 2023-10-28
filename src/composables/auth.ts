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

  function signup(username: string, password: string, email: string) {
    try {
      const res = Auth.signUp({
        username,
        password,
        attributes: { email },
        autoSignIn: { enabled: true },
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return { login, signup };
}
