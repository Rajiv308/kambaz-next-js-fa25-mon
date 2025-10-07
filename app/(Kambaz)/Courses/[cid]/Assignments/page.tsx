import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import TypeControlButtons from "./TypeControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { GiStabbedNote } from "react-icons/gi";
export default async function Assignments({
  params,
}: Readonly<{ params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignments
            <TypeControlButtons value={40} />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-3 text-secondary" />
                <GiStabbedNote className="me-4 fs-3 text-success" />

                <div className="me-3">
                  <Link
                    href={`/Courses/${cid}/Assignments/123`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    <span className="text-danger">Multiple Modules</span> |
                    <b>Not Available until</b> May 6 at 12:00 am |
                    <br />
                    <b>Due</b> May 13 at 11:59pm | 100pts
                  </div>
                </div>

                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-3 text-secondary" />
                <GiStabbedNote className="me-4 fs-3 text-success" />

                <div className="me-3">
                  <Link
                    href={`/Courses/${cid}/Assignments/234`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not Available until</b> May 13 at 12:00 am |
                    <br />
                    <b>Due</b> May 20 at 11:59pm | 100pts
                  </div>
                </div>

                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-3 text-secondary" />
                <GiStabbedNote className="me-4 fs-3 text-success" />

                <div className="me-3">
                  <Link
                    href={`/Courses/${cid}/Assignments/345`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A3 - CSS + BOOTSTRAP
                  </Link>
                  <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not Available until</b> May 20 at 12:00 am |
                    <br />
                    <b>Due</b> May 27 at 11:59pm | 100pts
                  </div>
                </div>

                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            QUIZZES
            <TypeControlButtons value={10} />
          </div>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            EXAMS
            <TypeControlButtons value={20} />
          </div>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            PROJECTS
            <TypeControlButtons value={30} />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
