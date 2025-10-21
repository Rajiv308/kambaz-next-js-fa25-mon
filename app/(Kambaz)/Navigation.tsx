"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BsCalendar4Week } from "react-icons/bs";
import { HiBeaker } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      path: "/Dashboard",
      icon: AiOutlineDashboard,
      id: "wd-dashboard-link",
    },
    {
      label: "Courses",
      path: "/Dashboard",
      icon: BsJournalBookmarkFill,
      id: "wd-course-link",
    },
    {
      label: "Calendar",
      path: "/Calendar",
      icon: BsCalendar4Week,
      id: "wd-calendar-link",
    },
    { label: "Inbox", path: "/Inbox", icon: FaInbox, id: "wd-inbox-link" },
    { label: "Labs", path: "/Labs", icon: HiBeaker, id: "wd-labs-link" },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>

      {links.map((link) => (
        <ListGroupItem
          key={link.id}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
