"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./store";
export default function Kambaz() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  if (currentUser) {
    return redirect("/Dashboard");
  }
  redirect("/Account/Signin");
}
