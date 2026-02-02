import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const user = auth.currentUser;


  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      {user && (
        <>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>

          <br />
        </>
      )}
    </div>
  );
}
