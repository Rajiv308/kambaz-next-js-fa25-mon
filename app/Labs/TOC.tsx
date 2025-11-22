"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href="/Labs"
          as={Link}
          className={`nav-link ${pathname === "/Labs" ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/Lab1"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/Lab2"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/Lab3"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/Lab4"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Lab 4
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/Labs/Lab5"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}
          style={{ width: "100px" }}
        >
          Lab 5
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link} style={{ width: "100px" }}>
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://github.com/Rajiv308/kambaz-next-js-fa25-mon"
          style={{ width: "100px" }}
        >
          Frontend GitHub
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://github.com/Rajiv308/kambaz-node-server-app"
          style={{ width: "100px" }}
        >
          Backend GitHub
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://kambaz-node-server-app-6lfs.onrender.com"
          style={{ width: "100px" }}
        >
          Render
        </NavLink>
      </NavItem>
    </Nav>
  );
}
