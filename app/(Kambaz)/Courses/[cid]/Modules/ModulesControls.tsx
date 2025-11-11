/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";
  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-end flex-wrap gap-2 align-items-center"
    >
      <Button
        variant="secondary"
        size="lg"
        className="me-2"
        id="wd-collapse-all-btn"
      >
        Collapse All
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-2"
        id="wd-view-progress-btn"
      >
        View Progress
      </Button>

      {isFaculty && (
        <>
          <Dropdown className="me-2">
            <DropdownToggle
              variant="secondary"
              size="lg"
              id="wd-publish-all-btn"
            >
              <GreenCheckmark /> Publish All
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                id="wd-publish-all-modules-and-items"
                className="d-flex align-items-center"
              >
                <GreenCheckmark /> Publish All modules and items
              </DropdownItem>
              <DropdownItem
                id="wd-publish-modules-only"
                className="d-flex align-items-center"
              >
                <GreenCheckmark /> Publish modules only
              </DropdownItem>
              <DropdownItem
                id="wd-unpublish-all-modules-and-items"
                className="d-flex align-items-center"
              >
                <MdDoNotDisturbAlt
                  className="me-1 fs-5 align-middle text-secondary"
                  style={{ position: "relative" }}
                />
                Unpublish all modules and items
              </DropdownItem>
              <DropdownItem
                id="wd-unpublish-modules-only"
                className="d-flex align-items-center"
              >
                <MdDoNotDisturbAlt
                  className="me-1 fs-5 align-middle text-secondary"
                  style={{ position: "relative" }}
                />
                Unpublish modules only
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            id="wd-add-module-btn"
            onClick={handleShow}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Module
          </Button>
        </>
      )}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
