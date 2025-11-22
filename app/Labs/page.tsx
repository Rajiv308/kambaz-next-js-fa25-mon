import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <table id="wd-student-info" cellPadding={15}>
        <tbody>
          <tr>
            <td>
              <strong>Full Name:</strong> Rajiv Premnath Menon
            </td>
            <td>
              <strong>Section:</strong> CS5010 - Web Development
            </td>
            <td>
              <strong>Frontend GitHub Repo: </strong>
              <a
                href="https://github.com/Rajiv308/kambaz-next-js-fa25-mon.git"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Repository
              </a>
            </td>
            <td>
              <strong>Backend GitHub Repo: </strong>
              <a
                href="https://github.com/Rajiv308/kambaz-node-server-app.git"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Repository
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>Labs</h1>

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: Managing State and User Input with Forms
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Implementing RESTful Web APIs with Express.js
          </Link>
        </li>

        <li>
          <Link href="/" id="wd-lab3-link">
            Kambaz
          </Link>
        </li>
      </ul>
    </div>
  );
}
