/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

interface PazzaNavBarProps {
  courseName: string;
  userName: string;
  isFaculty: boolean;
}

export default function PazzaNavBar({
  courseName,
  userName,
  isFaculty,
}: PazzaNavBarProps) {
  const { cid } = useParams();
  const pathname = usePathname();

  const isQA =
    pathname?.endsWith("/Pazza") || pathname?.includes("/Pazza/post");
  const isManageClass = pathname?.includes("/Pazza/manage");

  return (
    <div className="pazza-navbar">
      <div className="d-flex align-items-center">
        <span className="pazza-logo">pazza</span>
        <span className="pazza-course-name">{cid}</span>
      </div>

      <div className="pazza-nav-tabs">
        <Link
          href={`/Courses/${cid}/Pazza`}
          className={`pazza-nav-tab ${isQA ? "active" : ""}`}
        >
          Q & A
        </Link>
        <span className="pazza-nav-tab disabled">Resources</span>
        <span className="pazza-nav-tab disabled">Statistics</span>
        {isFaculty && (
          <Link
            href={`/Courses/${cid}/Pazza/manage`}
            className={`pazza-nav-tab ${isManageClass ? "active" : ""}`}
          >
            Manage Class
          </Link>
        )}
      </div>

      <div className="pazza-user">
        <FaUser />
        <span>{userName}</span>
      </div>
    </div>
  );
}
