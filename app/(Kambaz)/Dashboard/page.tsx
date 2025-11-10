/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "./reducer";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "New Department",
    credits: 4,
    imgLocation: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);

  const getUserCourses = useCallback(() => {
    const userId = (currentUser as any)?._id;
    if (!userId) {
      router.push(`/Account/Signin`);
    }

    if (showAllCourses) {
      setDisplayedCourses(courses);
    } else {
      setDisplayedCourses(
        courses.filter((course) =>
          enrollments.some(
            (enrollment) =>
              enrollment.user === userId && enrollment.course === course._id
          )
        )
      );
    }
  }, [courses, enrollments, showAllCourses, currentUser]);

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  const isUserEnrolled = (courseId: string) => {
    const userId = (currentUser as any)?._id;
    return enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === courseId
    );
  };

  const handleEnrollToggle = (courseId: string) => {
    const userId = (currentUser as any)?._id;
    const enrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );

    if (enrollment) {
      dispatch(unenrollCourse(enrollment._id));
    } else {
      dispatch(enrollCourse({ user: userId, course: courseId }));
    }
  };

  const handleCourseClick = (courseId: string, event: any) => {
    if (!isFaculty && !isUserEnrolled(courseId)) {
      event.preventDefault();
      alert("You must enroll to access this course!");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5 className="d-flex align-items-center justify-content-between">
            New Course
            <div className="float-end">
              <Button
                className="btn btn-warning me-2"
                onClick={() => dispatch(updateCourse(course))}
                id="wd-update-course-click"
              >
                Update
              </Button>
              <Button
                className="btn btn-primary"
                id="wd-add-new-course-click"
                onClick={() => {
                  console.log("Adding course:", course);
                  dispatch(addNewCourse(course));
                }}
              >
                Add
              </Button>
            </div>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Published Courses" : "My Enrollments"} (
          {displayedCourses.length})
        </h2>
        <Button
          className="float-end"
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Show All Enrollments"}
        </Button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => {
            const enrolled = isUserEnrolled(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course me-2"
                style={{ width: "300px" }}
              >
                <Card>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-ai">
                        Click to view the {course.name} course
                      </Tooltip>
                    }
                  >
                    <div>
                      <Link
                        href={`/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <CardImg
                          src={`/images/${course.imgLocation}`}
                          variant="top"
                          width="100%"
                          height={160}
                        />
                        <CardBody className="card-body">
                          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                            {course._id} {course.name}
                          </CardTitle>
                          <CardText
                            className="wd-dashboard-course-description overflow-hidden"
                            style={{ height: "100px" }}
                          >
                            {course.description}
                          </CardText>
                          {showAllCourses ? (
                            <>
                              <Button
                                variant={enrolled ? "danger" : "success"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEnrollToggle(course._id);
                                }}
                              >
                                {enrolled ? "Unenroll" : "Enroll"}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="primary"> Go </Button>
                              {isFaculty && (
                                <>
                                  <Button
                                    onClick={(event) => {
                                      event.preventDefault();
                                      dispatch(deleteCourse(course._id));
                                    }}
                                    className="btn btn-danger float-end"
                                    id="wd-delete-course-click"
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    id="wd-edit-course-click"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setCourse(course);
                                    }}
                                    className="btn btn-warning me-2 float-end"
                                  >
                                    Edit
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </CardBody>
                      </Link>
                    </div>
                  </OverlayTrigger>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
