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
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-3">
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-ai">
                    Click to view the React JS course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/reactjs.jpg"
                      alt="React JS course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS1234 React JS
                      </CardTitle>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Full Stack software developer
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-ai">
                    Click to view the Artificial Intelligence & Machine Learning
                    course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5501"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/ai.jpg"
                      alt="Artificial Intelligence course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5501 Artificial Intelligence & Machine Learning
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Learn the foundations of AI, ML algorithms, and
                        applications.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-data-structures">
                    Click to view the Data Structures & Algorithms course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5502"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/dsa.jpg"
                      alt="Data Structures & Algorithms course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5502 Data Structures & Algorithms
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Master problem-solving with efficient algorithms and
                        data models.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-os">
                    Click to view the Operating Systems & Virtualization course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5503"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/os.jpg"
                      alt="Operating Systems course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5503 Operating Systems & Virtualization
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Explore processes, memory, and virtualization
                        technologies.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-dbms">
                    Click to view the Database Management Systems course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5504"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/dbms.jpg"
                      alt="Database Management Systems course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5504 Database Management Systems
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Understand relational models, SQL, and transaction
                        systems.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-networks">
                    Click to view the Computer Networks & Security course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5505"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/networks.jpg"
                      alt="Computer Networks and Security course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5505 Computer Networks & Security
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Dive into TCP/IP, routing, and cybersecurity principles.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
          <Col className="wd-dashboard-course me-2" style={{ width: "300px" }}>
            <Card>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-hci">
                    Click to view the Human-Computer Interaction course
                  </Tooltip>
                }
              >
                <div>
                  <Link
                    href="/Courses/5506"
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/hci.jpg"
                      alt="Human-Computer Interaction course thumbnail"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        CS5506 Human-Computer Interaction
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        Learn about user-centered design and usability
                        principles.
                      </CardText>
                      <Button variant="primary">Go </Button>
                    </CardBody>
                  </Link>
                </div>
              </OverlayTrigger>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
