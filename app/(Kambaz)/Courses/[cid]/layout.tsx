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
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );

  const course = courses.find((course: any) => course._id === cid);
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!currentUser || !cid) return;

      const course = await client.fetchAllCourses();
      const exists = course.some((c: any) => c._id === cid);

      if (!exists) {
        router.push("/Dashboard");
        return;
      }

      const currentUserId = (currentUser as any)?._id;
      if (!currentUserId) {
        router.push("/Account/Signin");
        return;
      }

      const isFaculty = (currentUser as any)?.role === "FACULTY";
      if (isFaculty) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      try {
        const enrollments = await client.fetchEnrollmentsForUser(
          (currentUser as any)._id
        );

        const isEnrolled = enrollments.some(
          (enrollment: any) => enrollment.course === cid
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
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showSidebar && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
