/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";
import * as client from "../../client";
import PeopleDetails from "./Details";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { RootState } from "@/app/(Kambaz)/store";
import { useSelector } from "react-redux";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );

  const fetchUsers = async () => {
    if (!cid) return;
    const courseId = Array.isArray(cid) ? cid[0] : cid;
    try {
      const courseUsers = await client.fetchUsersForCourse(courseId);
      setUsers(courseUsers);
    } catch (err) {
      console.error("Failed to fetch users for course:", err);
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findEnrolledUsersByPartialName(
        cid as any,
        name
      );
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findEnrolledUsersByRole(cid as any, role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid, showCreateDrawer]);

  return (
    <div id="wd-people">
      <h2>People</h2>
      {showCreateDrawer && (
        <PeopleDetails
          mode="create"
          onClose={() => {
            setShowCreateDrawer(false);
            fetchUsers();
          }}
          onUserCreated={async (newUser) => {
            setUsers([...users, newUser]);
            await client.enrollInCourse(newUser._id, cid as string);
          }}
          onUserDeleted={async (deletedUser) => {
            setUsers(users.filter((u) => u._id !== deletedUser._id));
            await client.unenrollFromCourse(deletedUser._id, cid as string);
          }}
        />
      )}
      {canManageUsers && (
        <button
          onClick={() => setShowCreateDrawer(true)}
          className="float-end btn btn-danger wd-add-people"
        >
          <FaPlus className="me-2" />
          Users
        </button>
      )}
      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="ASSISTANT">Teaching Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
