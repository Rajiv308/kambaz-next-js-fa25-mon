/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import * as client from "../client";

export default function Breadcrumb() {
  const { cid } = useParams();
  const pathname = usePathname();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    client.fetchCourseById(cid as any).then(setCourse);
  }, [cid]);

  if (!course) return null;

  const segments = pathname.split("/").filter(Boolean);
  const displaySegments = segments.map((seg) =>
    seg === cid ? course.name : seg
  );

  return <span>{displaySegments.join(" > ")}</span>;
}
