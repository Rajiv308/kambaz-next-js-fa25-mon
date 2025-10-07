import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControls() {
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
        <Button variant="danger" size="lg" id="wd-add-module-btn">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>
    </div>
  );
}
