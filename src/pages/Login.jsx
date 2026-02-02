import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google Sign-In failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>CogniTrack</h1>
      <p>Sign in to continue</p>

      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
