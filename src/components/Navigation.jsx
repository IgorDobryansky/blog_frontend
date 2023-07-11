import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../context/reducer";

export default function Navigation() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  return (
    <header>
      <h1>App</h1>
      <nav>
        <Link to="/">Home</Link>

        {!!state.token ? (
          <div
            onClick={() => {
              dispatch({ type: "signout" });
              navigate("/");
            }}
          >
            Sign Out
          </div>
        ) : (
          <>
            <Link to="/auth/signup">Sign Un</Link>
            <Link to="/auth/signin">Sign In</Link>
          </>
        )}
      </nav>
    </header>
  );
}
