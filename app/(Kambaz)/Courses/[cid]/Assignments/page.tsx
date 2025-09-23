import Link from "next/link";

export default async function Assignments({
  params,
}: Readonly<{ params: Promise<{ cid: string }> }>) {
   const { cid } = await params;
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/123`}
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <br />
          Multiple Modules | <b>Not Available until</b> May 6 at 12:00 am |
          <br />
          <b>Due</b> May 13 at 11:59pm | 100pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/234`}
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <br />
          Multiple Modules | <b>Not Available until</b> May 13 at 12:00 am |
          <br />
          <b>Due</b> May 20 at 11:59pm | 100pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/345`}
            className="wd-assignment-link"
          >
            A3 - CSS + BOOTSTRAP
          </Link>
          <br />
          Multiple Modules | <b>Not Available until</b> May 20 at 12:00 am |
          <br />
          <b>Due</b> May 27 at 11:59pm | 100pts
        </li>
      </ul>
            <h3 id="wd-assignments-title">
        QUIZZES 40% of Total <button>+</button>
      </h3>
            <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
            <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
    </div>
  );
}
