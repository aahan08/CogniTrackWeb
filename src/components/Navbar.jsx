import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3>CogniTrack</h3>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <NavLink to="/time-tracker">Time Tracker</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>

          <span>{user.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
