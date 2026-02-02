import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, []);

  const user = auth.currentUser;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      {user && (
        <>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}
