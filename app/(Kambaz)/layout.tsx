"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session";
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" style={{ height: "100vh", overflow: "hidden" }}>
          <div className="d-flex" style={{ height: "100%" }}>
            <div className="flex-shrink-0">
              <KambazNavigation />
            </div>
            <div
              className="wd-main-content-offset p-3 flex-fill d-flex flex-column"
              style={{ minHeight: 0, overflowY: "auto" }}
            >
              {children}
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}
