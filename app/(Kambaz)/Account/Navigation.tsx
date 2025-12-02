/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Nav variant="pills">
        {links.map((link) => (
          <NavItem key={link}>
            <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
              {link}
            </NavLink>
          </NavItem>
        ))}
        {currentUser && ["ADMIN"].includes((currentUser as any)?.role) && (
          <NavLink
            as={Link}
            href={`/Account/Users`}
            active={pathname.endsWith("Users")}
          >
            Users
          </NavLink>
        )}
      </Nav>
    </div>
  );
}
