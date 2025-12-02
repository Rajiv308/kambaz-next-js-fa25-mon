/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/(Kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
export default function AssignmentControls({
  addAssignment,
}: {
  addAssignment: (assignment: any) => void;
}) {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );
  const handleAddAssignment = () => {
    const newId = uuidv4();
    addAssignment({
      _id: newId,
      title: "",
      description: "",
      points: 0,
      dueDate: new Date().toISOString().slice(0, 16),
      availableFrom: new Date().toISOString().slice(0, 16),
      availableUntil: new Date().toISOString().slice(0, 16),
      course: cid,
      group: "",
      displayAs: "",
      submissionType: "",
      onlineOptions: [],
      assignTo: "",
      isNew: true,
    });
    router.push(`/Courses/${cid}/Assignments/${newId}`);
  };
  return (
    <div
      id="wd-modules-controls"
      className="d-flex align-items-center justify-content-between text-nowrap mx-2"
    >
      <InputGroup className="mb-3" style={{ width: "300px" }}>
        <InputGroupText id="search-icon">
          <BsSearch />
        </InputGroupText>
        <FormControl
          type="text"
          placeholder="Search..."
          size="lg"
          style={{ width: "250px" }}
          id="wd-search-bar"
        />
      </InputGroup>
      {canManageUsers && (
        <div className="d-flex align-items-center mb-3">
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-view-progress-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <Button
            variant="danger"
            size="lg"
            id="wd-add-assignment-btn"
            onClick={handleAddAssignment}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </div>
      )}
    </div>
  );
}
