/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAssignment = async () => {
    try {
      const data = await client.getAssignment(aid);
      setAssignment(data);
      console.log("Now Here :" + JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  if (loading) return <div>Loading assignment...</div>;
  if (!assignment) return <div>Assignment not found</div>;

  const handleSave = async () => {
    const cleaned = { ...assignment };
    delete cleaned.isNew;
    console.log("Assignment to save :" + JSON.stringify(cleaned, null, 2));

    await client.updateAssignment(cleaned);
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = async () => {
    console.log("Assignment to cancel :" + JSON.stringify(assignment, null, 2));
    if (assignment.isNew) {
      await client.deleteAssignment(assignment._id);
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  const formatDateTimeLocal = (iso: string) => iso.slice(0, 16);

  return (
    <div id="wd-assignments-editor">
      <br />
      <div className="mb-3 ms-2">
        <Form.Label>
          <b>Assignment Name</b>
        </Form.Label>
        {isFaculty ? (
          <Form.Control
            type="text"
            defaultValue={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        ) : (
          <div className="form-control-plaintext">{assignment.title}</div>
        )}
        <br />

        <Form.Label>
          <b>Description</b>
        </Form.Label>
        {isFaculty ? (
          <Form.Control
            as="textarea"
            rows={10}
            defaultValue={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        ) : (
          <div className="form-control-plaintext">{assignment.description}</div>
        )}
        <br />
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-points">
              <b>Points</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            {isFaculty ? (
              <Form.Control
                type="number"
                value={assignment.points}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    points: parseInt(e.target.value),
                  })
                }
              />
            ) : (
              <div className="form-control-plaintext">{assignment.points}</div>
            )}
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-group">
              <b>Assignment Group</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            {isFaculty ? (
              <Form.Select
                id="wd-group"
                defaultValue={assignment.group}
                onChange={(e) =>
                  setAssignment({ ...assignment, group: e.target.value })
                }
              >
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
              </Form.Select>
            ) : (
              <div className="form-control-plaintext">{assignment.group}</div>
            )}
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col sm={3} className="text-end mt-2">
            <Form.Label htmlFor="wd-display-grade-as">
              <b>Display Grade As</b>
            </Form.Label>
          </Col>
          <Col sm={9}>
            {isFaculty ? (
              <Form.Select
                id="wd-display-grade-as"
                defaultValue={assignment.displayAs}
                onChange={(e) =>
                  setAssignment({ ...assignment, displayAs: e.target.value })
                }
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="CGPA">CGPA</option>
                <option value="ABSOLUTE">Absolute</option>
              </Form.Select>
            ) : (
              <div className="form-control-plaintext">
                {assignment.displayAs}
              </div>
            )}
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
              {isFaculty ? (
                <Form.Select
                  id="wd-submission-type"
                  defaultValue={assignment.submissionType}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      submissionType: e.target.value,
                    })
                  }
                  className="mb-2"
                >
                  <option value="ONLINE">Online</option>
                  <option value="WRITTEN">Written</option>
                  <option value="PRESENTATION">Presentation</option>
                </Form.Select>
              ) : (
                <div className="form-control-plaintext">
                  {assignment.submissionType}
                </div>
              )}

              <Form.Label className="my-3">
                <b>Online Entry Options:</b>
              </Form.Label>
              <div className="ms-2 d-flex flex-column gap-3 mb-2">
                {onlineOptions.map((option) => (
                  <Form.Check
                    key={option}
                    id={`online-option-${option.replace(/\s+/g, "-")}`}
                    type="checkbox"
                    label={option}
                    value={option}
                    checked={assignment.onlineOptions.includes(option)}
                    disabled={!isFaculty}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = e.target.value;

                      setAssignment((prev: any) => ({
                        ...prev,
                        onlineOptions: checked
                          ? [...prev.onlineOptions, value]
                          : prev.onlineOptions.filter(
                              (opt: any) => opt !== value
                            ),
                      }));
                    }}
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
              {isFaculty ? (
                <Form.Control
                  type="text"
                  value={assignment.assignTo}
                  onChange={(e) =>
                    setAssignment({ ...assignment, assignTo: e.target.value })
                  }
                />
              ) : (
                <div className="form-control-plaintext">
                  {assignment.assignTo}
                </div>
              )}
              <Form.Label htmlFor="wd-due-date" className="d-block mb-1">
                <b>Due</b>
              </Form.Label>
              {isFaculty ? (
                <Form.Control
                  type="datetime-local"
                  value={formatDateTimeLocal(assignment.dueDate)}
                  onChange={(e) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              ) : (
                <div className="form-control-plaintext">
                  {formatDateTimeLocal(assignment.dueDate)}
                </div>
              )}

              <Row>
                <Col>
                  <Form.Label htmlFor="wd-available-from">
                    <b>Available From</b>
                  </Form.Label>
                  {isFaculty ? (
                    <Form.Control
                      type="datetime-local"
                      value={formatDateTimeLocal(assignment.availableFrom)}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableFrom: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <div className="form-control-plaintext">
                      {formatDateTimeLocal(assignment.availableFrom)}
                    </div>
                  )}
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-until">
                    <b>Until</b>
                  </Form.Label>
                  {isFaculty ? (
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDateTimeLocal(
                        assignment.availableUntil
                      )}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          availableUntil: e.target.value,
                        })
                      }
                      id="wd-available-until"
                    />
                  ) : (
                    <div className="form-control-plaintext">
                      {formatDateTimeLocal(assignment.availableUntil)}
                    </div>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <hr />
        {isFaculty ? (
          <div className="text-end">
            <Button variant="secondary" id="wd-cancel" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              variant="danger"
              id="wd-save"
              className="ms-2"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="text-end">
            <Button
              variant="danger"
              id="wd-close"
              onClick={() => router.push(`/Courses/${cid}/Assignments`)}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
