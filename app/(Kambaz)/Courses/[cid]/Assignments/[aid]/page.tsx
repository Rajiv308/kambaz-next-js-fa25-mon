"use client";
import { useParams } from "next/navigation";
import { Row, Col, Button } from "react-bootstrap";
import * as db from "../../../../Database";
import Form from "react-bootstrap/Form";
import Link from "next/link";

export default function AssignmentEditor() {
  const onlineOptions = [
    "Text Entry",
    "Website URL",
    "Media Recordings",
    "Student Annotations",
    "File Upload",
  ];
  const params = useParams();
  const { cid, aid } = params as { cid: string; aid: string };
  const assignment = db.assignments.find(
    (a) => a.course === cid && a._id === aid
  );
  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const isOptionSelected = (option: string) =>
    assignment.onlineOptions?.includes(option);

  const formatDateTimeLocal = (iso: string) => iso.slice(0, 16);

  return (
    <div id="wd-assignments-editor">
      <br />
      <div className="mb-3 ms-2">
        <Form.Label>
          <b>Assignment Name</b>
        </Form.Label>
        <Form.Control type="text" defaultValue={assignment.title} />
        <br />

        <Form.Label>
          <b>Description</b>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          defaultValue={assignment.description}
        />
        <br />
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-points">
              <b>Points</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              id="wd-points"
              type="number"
              defaultValue={assignment.points}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-group">
              <b>Assignment Group</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select id="wd-group" defaultValue={assignment.group}>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-display-grade-as">
              <b>Display Grade As</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select
              id="wd-display-grade-as"
              defaultValue={assignment.displayAs}
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="CGPA">CGPA</option>
              <option value="ABSOLUTE">Absolute</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-4 align-items-start">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-submission-type">
              <b>Submission Type</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form className="border border-1 border-gray rounded p-3 mb-3">
              <Form.Select
                id="wd-submission-type"
                defaultValue={assignment.submissionType}
                className="mb-2"
              >
                <option value="ONLINE">Online</option>
                <option value="WRITTEN">Written</option>
                <option value="PRESENTATION">Presentation</option>
              </Form.Select>

              <Form.Label className="my-3">
                <b>Online Entry Options:</b>
              </Form.Label>
              <div className="ms-2 d-flex flex-column gap-3 mb-2">
                {onlineOptions.map((option) => (
                  <Form.Check
                    key={option}
                    type="checkbox"
                    label={option}
                    defaultChecked={isOptionSelected(option)}
                  />
                ))}
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-assign-to">
              <b>Assign</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form className="border border-1 border-gray rounded p-3 mb-3">
              <Form.Label htmlFor="wd-assign-to">
                <b>Assign To</b>
              </Form.Label>
              <Form.Control
                id="wd-assign-to"
                defaultValue={assignment.assignTo}
                className="mb-3"
              />

              <Form.Label htmlFor="wd-due-date" className="d-block mb-1">
                <b>Due</b>
              </Form.Label>
              <Form.Control
                type="datetime-local"
                id="wd-due-date"
                defaultValue={formatDateTimeLocal(assignment.dueDate)}
                className="mb-3"
              />

              <Row>
                <Col>
                  <Form.Label htmlFor="wd-available-from">
                    <b>Available From</b>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(assignment.availableFrom)}
                    id="wd-available-from"
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-until">
                    <b>Until</b>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(assignment.dueDate)}
                    id="wd-available-until"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <hr />
        <div className="text-end">
          <Link href={`/Courses/${cid}/Assignments`} passHref>
            <Button variant="secondary" id="wd-cancel">
              Cancel
            </Button>
          </Link>

          <Link href={`/Courses/${cid}/Assignments`} passHref>
            <Button variant="danger" id="wd-save" className="ms-2">
              Save
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
