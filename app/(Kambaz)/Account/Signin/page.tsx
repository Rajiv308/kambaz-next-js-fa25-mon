/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../client";
import { redirect, useRouter } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <>
      {/* Sign-in form stays exactly as before */}
      <div id="wd-signin-screen" className="ms-2" style={{ maxWidth: 400 }}>
        <h1>Sign in</h1>
        <FormControl
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          id="wd-username"
          placeholder="username"
          className="mb-2"
        />
        <FormControl
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />
        <Button
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Button>
        <button
          id="wd-signin-link"
          className="btn btn-secondary w-100"
          onClick={() => router.push("/Account/Signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Team info box fixed to right */}
      <div
        className="border p-3 bg-white shadow"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "350px",
          fontSize: "14px",
          lineHeight: 1.5,
          zIndex: 1000,
        }}
      >
        <strong>Team Members:</strong>
        <div>Mohammed Aqeel Zaman</div>
        <div>Rajiv Premnath Menon</div>
        <br />
        <strong>Frontend Next.js Repo:</strong>
        <div>
          <a
            href="https://github.com/Rajiv308/kambaz-next-js-fa25-mon.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Rajiv308/kambaz-next-js-fa25-mon.git
          </a>
        </div>
        <br />
        <strong>Backend Node.js Repo:</strong>
        <div>
          <a
            href="https://github.com/Rajiv308/kambaz-node-server-app.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Rajiv308/kambaz-node-server-app.git
          </a>
        </div>
      </div>
    </>
  );
}
