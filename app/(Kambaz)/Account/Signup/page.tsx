import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen" className="ms-2" style={{ maxWidth: 400 }}>
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        defaultValue={"Username"}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        defaultValue={"password"}
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
        defaultValue="password"
      />
      <Link
        id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
      <Link id="wd-signin-link" href="Signin">
        {" "}
        Sign in{" "}
      </Link>
    </div>
  );
}
