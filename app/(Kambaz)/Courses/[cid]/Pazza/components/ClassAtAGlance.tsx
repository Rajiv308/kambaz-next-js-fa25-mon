/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import * as client from "../client";
import * as courseClient from "../../../client";

interface ClassAtAGlanceProps {
  courseId: string;
  posts?: any[];
}

export default function ClassAtAGlance({
  courseId,
  posts = [],
}: ClassAtAGlanceProps) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalQuestions: 0,
    totalNotes: 0,
    instructorResponses: 0,
    studentResponses: 0,
    enrolledStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pazzaStats, users] = await Promise.all([
          client.fetchStatistics(courseId),
          courseClient.fetchUsersForCourse(courseId).catch(() => []),
        ]);

        const studentCount = Array.isArray(users)
          ? users.filter((u: any) => u.role === "STUDENT").length
          : 0;

        setStats({
          totalPosts: pazzaStats.totalPosts || posts.length || 0,
          totalQuestions:
            pazzaStats.totalQuestions ||
            posts.filter((p) => p.postType === "Question").length ||
            0,
          totalNotes:
            pazzaStats.totalNotes ||
            posts.filter((p) => p.postType === "Note").length ||
            0,
          instructorResponses: pazzaStats.instructorAnswers || 0,
          studentResponses: pazzaStats.studentAnswers || 0,
          enrolledStudents: studentCount,
        });
      } catch (error) {
        const questions = posts.filter((p) => p.postType === "Question");
        const notes = posts.filter((p) => p.postType === "Note");
        setStats({
          totalPosts: posts.length,
          totalQuestions: questions.length,
          totalNotes: notes.length,
          instructorResponses: 0,
          studentResponses: 0,
          enrolledStudents: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [courseId, posts]);

  if (loading) {
    return <div className="p-4">Loading statistics...</div>;
  }

  return (
    <div className="pazza-glance">
      <div className="pazza-glance-header">
        <FaLock className="text-muted" size={16} />
        <h4 className="pazza-glance-title">Class at a Glance</h4>
      </div>
      <p className="pazza-glance-updated">Updated just now</p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="pazza-glance-status">
            <FaCheckCircle className="text-success" size={18} />
            <span>no unread posts</span>
          </div>
          <div className="pazza-glance-status">
            <FaCheckCircle className="text-success" size={18} />
            <span>no unanswered questions</span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="pazza-glance-stats">
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.totalPosts}
              </span>
              <span>total posts</span>
            </div>
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.totalQuestions}
              </span>
              <span>questions</span>
            </div>
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.totalNotes}
              </span>
              <span>notes</span>
            </div>
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.instructorResponses}
              </span>
              <span>instructor responses</span>
            </div>
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.studentResponses}
              </span>
              <span>student responses</span>
            </div>
            <div className="pazza-glance-stat">
              <span className="pazza-glance-stat-value">
                {stats.enrolledStudents}
              </span>
              <span>students enrolled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
