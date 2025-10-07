"use client";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <br />
      <div className="mb-3 ms-2">
        <Form.Label>
          <b>Assignment Name</b>
        </Form.Label>
        <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        <br />

        <Form.Label>
          <b>Description</b>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Vercel. The landing page should be the Kambaz application with a link to the Lab exercises. Lab 1 should be the landing page of the Lab exercises and should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include a link to navigate back to the landing page.`}
          className="mb-4"
        />
        <br />
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-points">
              <b>Points</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control id="wd-points" type="number" defaultValue={100} />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-group">
              <b>Assignment Group</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
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
            <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
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
                defaultValue="ONLINE"
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
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check type="checkbox" label="Website URL" />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotations" />
                <Form.Check type="checkbox" label="File Upload" />
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
                defaultValue="Everyone"
                className="mb-3"
              />

              <Form.Label htmlFor="wd-due-date" className="d-block mb-1">
                <b>Due</b>
              </Form.Label>
              <Form.Control
                type="date"
                id="wd-due-date"
                defaultValue="2025-10-21"
                className="mb-3"
              />

              <Row>
                <Col>
                  <Form.Label htmlFor="wd-available-from">
                    <b>Available From</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue="2025-10-21"
                    id="wd-available-from"
                  />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-until">
                    <b>Until</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue="2025-10-21"
                    id="wd-available-until"
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <hr />
        <div className="text-end">
          <Button variant="secondary" id="wd-cancel">
            Cancel
          </Button>
          <Button variant="danger" id="wd-save" className="ms-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
