import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { courses } from "../Database";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
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
                        <Button variant="primary"> Go </Button>
                      </CardBody>
                    </Link>
                  </div>
                </OverlayTrigger>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
