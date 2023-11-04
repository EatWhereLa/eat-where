import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Amplify, Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-southeast-1",
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT,
    cookieStorage: {
      domain: import.meta.env.VITE_COOKIE_DOMAIN,
      sameSite: "strict",
      secure: import.meta.env.VITE_COOKIE_DOMAIN === "localhost" ? false : true,
    },
  },
});

export function useAuth() {
  const { setAuth, setEmail, setUsername } = useAuthStore();
  const router = useRouter();
  async function isLoggedIn() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuth(true);
      setEmail(user.attributes.email);
      setUsername(user.username);
    } catch (error) {
      setAuth(false);
    }
  }
  async function login(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password);
      setAuth(true);
      setEmail(user.attributes.email);
      setUsername(user.username);
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
      return res;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function confirmSignup(username: string, code: string) {
    try {
      const res = await Auth.confirmSignUp(username, code);
      return res;
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
      setAuth(false);
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return { login, signup, confirmSignup, logout, isLoggedIn };
}
