/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import * as client from "../client";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );

  const course = client.fetchCourseById(cid as any);
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!course) {
        router.push("/Dashboard");
        return;
      }

      const currentUserId = (currentUser as any)?._id;
      if (!currentUserId) {
        router.push("/Account/Signin");
        return;
      }

      const isAuthorized = ["FACULTY", "ADMIN"].includes(
        (currentUser as any)?.role
      );
      if (isAuthorized) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      try {
        const enrollments = await client.fetchEnrollmentsForUser(currentUserId);
        console.log("Enrollments:", enrollments);
        console.log("Current CID:", cid);
        const isEnrolled = enrollments.some(
          (enrollment: any) => enrollment._id === cid
        );

        if (isEnrolled) {
          setAuthorized(true);
        } else {
          router.push("/Dashboard");
        }
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
        router.push("/Dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization(); // call the inner async function
  }, [currentUser, cid, router]);

  if (loading || !authorized) return null;

  return (
    <div
      id="wd-courses"
      className="d-flex flex-column flex-fill"
      style={{ minHeight: 0 }}
    >
      <h2 className="text-danger flex-shrink-0 mb-0">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
        <Breadcrumb />
      </h2>
      <hr className="flex-shrink-0 mt-2 mb-2" />
      <div className="d-flex flex-fill" style={{ minHeight: 0 }}>
        {showSidebar && (
          <div className="d-none d-md-block flex-shrink-0 wd-course-navigation-wrapper">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
