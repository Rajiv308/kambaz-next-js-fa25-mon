export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <b>Assignment Name</b>
      </label>
      <br />
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        cols={50}
        rows={10}
        defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Vercel. The landing page should be the Kambaz application with a link to the Lab exercises. Lab 1 should be the landing page of the Lab exercises and should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include a link to navigate back to the landing page.`}
      ></textarea>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="CGPA">CGPA</option>
                <option value="ABSOLUTE">Absolute</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="WRITTEN">Written</option>
                <option value="PRESENTATION">Presentation</option>
              </select>
              <br />
              <br />
              <label>Online Entry Options:</label>
              <br />
              <input
                type="checkbox"
                name="wd-online-entry"
                id="wd-text-entry"
              />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input
                type="checkbox"
                name="wd-online-entry"
                id="wd-website-url"
              />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input
                type="checkbox"
                name="wd-online-entry"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input
                type="checkbox"
                name="wd-online-entry"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotations</label>
              <br />
              <input
                type="checkbox"
                name="wd-online-entry"
                id="wd-file-upload"
              />
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign To</label>
              <br />
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input type="date" defaultValue="2025-10-21" id="wd-due-date" />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">Available From</label>
                      <br />
                      <input
                        type="date"
                        defaultValue="2025-10-21"
                        id="wd-available-from"
                      />
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">Until</label>
                      <br />
                      <input
                        type="date"
                        defaultValue="2025-10-21"
                        id="wd-available-until"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button id="wd-cancel">Cancel</button>
        <button id="wd-save">Save</button>
      </div>
    </div>
  );
}
