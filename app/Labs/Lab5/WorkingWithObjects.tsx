"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: "2301-DA-01",
    name: "Defence Against the Dark Arts",
    description:
      "This compulsory class teaches students how to defend themselves against dark magic, creatures, and curses through a curriculum that includes defensive and offensive magical training.",
    course: "HP2301",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <div className="d-flex align-items-center mt-2 justify-content-between">
        <FormControl
          className="w-75"
          id="wd-assignment-score"
          type="number"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>
      <div className="d-flex align-items-center mt-2 justify-content-between">
        <div>
          <input
            className="form-check-input me-2"
            id="wd-assignment-completed"
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                completed: e.target.checked,
              })
            }
          />
          <label className="form-check-label" htmlFor="wd-assignment-completed">
            Completed
          </label>
        </div>
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed Status
        </a>
      </div>
      <hr />

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Retrieving And Updating Module Properties</h4>
      <div className="d-flex align-items-center">
        <a
          id="wd-retrieve-module"
          className="btn btn-primary me-2"
          href={`${MODULE_API_URL}`}
        >
          Get Module
        </a>
        <a
          id="wd-retrieve-module-name"
          className="btn btn-primary me-2"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
        <a
          id="wd-retrieve-module-description"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description`}
        >
          Get Module Description
        </a>
      </div>
      <div className="d-flex align-items-center mt-2">
        <FormControl
          className="w-75 me-2"
          id="wd-module-description"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Description
        </a>
      </div>
      <hr />
    </div>
  );
}
