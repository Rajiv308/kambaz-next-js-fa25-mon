/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { redirect, useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const signup = async () => {
    if (!user.username || !user.password) {
      setError("Username and password are required");
      return;
    }
    if (user.password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      console.log("Redirecting to profile");
      router.push("/Account/Profile");
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "An error occurred during signup"
      );
      return;
    }
  };

  return (
    <div id="wd-signup-screen" className="ms-2" style={{ maxWidth: 400 }}>
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      {error && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {error}
        </div>
      )}
      <button
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={signup}
      >
        Sign up
      </button>
      <button
        id="wd-signin-link"
        className="btn btn-secondary w-100"
        onClick={() => router.push("/Account/Signin")}
      >
        Sign in
      </button>
    </div>
  );
}
