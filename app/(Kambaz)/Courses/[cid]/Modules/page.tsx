import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModulesControls from "./ModulesControls";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray ">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center flex-no-wrap">
            <div
              className="d-flex align-items-center"
              style={{ maxWidth: "80%" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <span className="text-truncate">
                Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
              </span>
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Introduction to the course
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Learn what is Web Development
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                READING
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Full Stack Developer - Chapter 1 - Introduction
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Full Stack Developer - Chapter 2 - Creating User Interface
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                SLIDES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Creating an HTTP server with Node.js
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Creating a React Application
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center flex-no-wrap">
            <div
              className="d-flex align-items-center"
              style={{ maxWidth: "80%" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <span className="text-truncate">
                Week 1, Lecture 2 - Formatting User Interfaces with HTML
              </span>
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Learn how to create user Interfaces with HTML
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Deploy the assignment to Netlify
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                SLIDES
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Introduction to HTML and the DOM
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Formatting Web content with Headings
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center text-truncate"
                style={{ maxWidth: "85%" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <span className="ps-5 text-truncate">
                  Formatting content with Lists and Tables
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center flex-no-wrap">
            <div
              className="d-flex align-items-center"
              style={{ maxWidth: "80%" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <span className="text-truncate">Week 2</span>
            </div>
            <ModuleControlButtons />
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center flex-no-wrap">
            <div
              className="d-flex align-items-center"
              style={{ maxWidth: "80%" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <span className="text-truncate">Week 3</span>
            </div>
            <ModuleControlButtons />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
