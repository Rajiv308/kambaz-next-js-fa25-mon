/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";
import * as client from "../../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

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

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-people">
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
