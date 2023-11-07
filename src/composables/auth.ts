import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Amplify, Auth } from "aws-amplify";
import { useToast } from "vuestic-ui";

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
  const { init } = useToast();
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
      init({
        message: `Logged In with ${user.username}`,
        color: "success",
      });
      router.push("/");
    } catch (error) {
      const err = error as Error;
      console.log("error signing in", error);
      init({
        message: err.message,
        color: "danger",
      });
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

      const err = error as Error;

      init({
        message: err.message,
        color: "danger",
      });
    }
  }

  async function confirmSignup(username: string, code: string) {
    try {
      const res = await Auth.confirmSignUp(username, code);
      return res;
    } catch (error) {
      console.log("error signing in", error);

      const err = error as Error;

      init({
        message: err.message,
        color: "danger",
      });
    }
  }

  async function logout() {
    try {
      await Auth.signOut();
      setAuth(false);
      localStorage.clear();
      setEmail('');
      setUsername('');
      init({
        message: "Successfully Logged Out",
        color: "success",
      });
      router.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
      init({
        message: "Error Logging out",
        color: "danger",
      });
    }
  }

  return { login, signup, confirmSignup, logout, isLoggedIn };
}
