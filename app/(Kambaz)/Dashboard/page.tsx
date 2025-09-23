import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              alt="React JS course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/5501" className="wd-dashboard-course-link">
            <Image
              src="/images/ai.jpg"
              alt="Artificial Intelligence course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5501 Artificial Intelligence & Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                Learn the foundations of AI, ML algorithms, and applications.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <Link href="/Courses/5502" className="wd-dashboard-course-link">
            <Image
              src="/images/dsa.jpg"
              alt="Data Structures and Algorithm course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5502 Data Structures & Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Master problem-solving with efficient algorithms and data
                models.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <Link href="/Courses/5503" className="wd-dashboard-course-link">
            <Image
              src="/images/os.jpg"
              alt="Operating Systems course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5503 Operating Systems & Virtualization </h5>
              <p className="wd-dashboard-course-title">
                Explore processes, memory, and virtualization technologies.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <Link href="/Courses/5504" className="wd-dashboard-course-link">
            <Image
              src="/images/dbms.jpg"
              alt="Database Management Systems course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5504 Database Management Systems </h5>
              <p className="wd-dashboard-course-title">
                Understand relational models, SQL, and transaction systems.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <Link href="/Courses/5505" className="wd-dashboard-course-link">
            <Image
              src="/images/networks.jpg"
              alt="Computer Networks and Security course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5505 Computer Networks & Security </h5>
              <p className="wd-dashboard-course-title">
                Dive into TCP/IP, routing, and cybersecurity principles.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />

        <div className="wd-dashboard-course">
          <Link href="/Courses/5506" className="wd-dashboard-course-link">
            <Image
              src="/images/hci.jpg"
              alt="Human-Computer Interaction course thumbnail"
              width={200}
              height={150}
            />
            <div>
              <h5> CS5506 Human–Computer Interaction </h5>
              <p className="wd-dashboard-course-title">
                Design usable, accessible, and engaging user interfaces.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
