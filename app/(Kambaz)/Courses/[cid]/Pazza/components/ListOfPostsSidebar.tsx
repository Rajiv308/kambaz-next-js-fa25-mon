/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Button, FormControl, Collapse } from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronRight,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";

interface ListOfPostsSidebarProps {
  posts: any[];
  selectedPost: any | null;
  searchText: string;
  showSidebar: boolean;
  onSearchChange: (text: string) => void;
  onSelectPost: (post: any) => void;
  onNewPost: () => void;
  onToggleSidebar: () => void;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // Sunday as first day of week
  return new Date(d.getFullYear(), d.getMonth(), diff);
}

function formatWeekRange(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const startMonth = weekStart.getMonth() + 1;
  const startDay = weekStart.getDate();
  const endMonth = weekEnd.getMonth() + 1;
  const endDay = weekEnd.getDate();

  return `${startMonth}/${startDay} - ${endMonth}/${endDay}`;
}

function groupPostsByDate(posts: any[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const groups: { [key: string]: any[] } = {};
  const weekRanges: { [key: string]: Date } = {};

  posts.forEach((post) => {
    const postDate = new Date(post.createdAt);
    const postDay = new Date(
      postDate.getFullYear(),
      postDate.getMonth(),
      postDate.getDate()
    );

    let groupKey: string;

    if (postDay.getTime() === today.getTime()) {
      groupKey = "Today";
    } else if (postDay.getTime() === yesterday.getTime()) {
      groupKey = "Yesterday";
    } else if (postDay >= lastWeekStart && postDay < yesterday) {
      groupKey = "Last Week";
    } else {
      const weekStart = getWeekStart(postDay);
      groupKey = formatWeekRange(weekStart);
      weekRanges[groupKey] = weekStart;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(post);
  });

  const orderedGroups: { [key: string]: any[] } = {};

  ["Today", "Yesterday", "Last Week"].forEach((key) => {
    if (groups[key]) {
      orderedGroups[key] = groups[key];
    }
  });

  const weekKeys = Object.keys(weekRanges).sort((a, b) => {
    return weekRanges[b].getTime() - weekRanges[a].getTime();
  });

  weekKeys.forEach((key) => {
    orderedGroups[key] = groups[key];
  });

  return orderedGroups;
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const postDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (postDay.getTime() === today.getTime()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").substring(0, 80);
}

export default function ListOfPostsSidebar({
  posts,
  selectedPost,
  searchText,
  showSidebar,
  onSearchChange,
  onSelectPost,
  onNewPost,
  onToggleSidebar,
}: ListOfPostsSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const groupedPosts = useMemo(() => groupPostsByDate(posts), [posts]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  if (!showSidebar) {
    return (
      <div className="pazza-sidebar-collapsed" onClick={onToggleSidebar}>
        <FaCaretRight size={14} className="pazza-sidebar-toggle" />
      </div>
    );
  }

  return (
    <div className="pazza-sidebar">
      <div className="pazza-sidebar-controls">
        <div className="pazza-sidebar-filters">
          <FaCaretLeft
            size={14}
            className="pazza-sidebar-toggle"
            onClick={onToggleSidebar}
          />
          <span>Unread</span>
          <span>Updated</span>
          <span>Unresolved</span>
          <span>Following</span>
        </div>
        <div className="pazza-sidebar-actions">
          <Button className="pazza-new-post-btn" size="sm" onClick={onNewPost}>
            New Post
          </Button>
          <FormControl
            type="text"
            placeholder="Search or add a post..."
            size="sm"
            className="pazza-search-input"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="pazza-posts-list">
        {Object.entries(groupedPosts).map(([group, groupPosts]) => {
          if (groupPosts.length === 0) return null;
          const isExpanded = expandedGroups[group] !== false;

          return (
            <div key={group}>
              <div
                className="pazza-group-header"
                onClick={() => toggleGroup(group)}
              >
                {isExpanded ? (
                  <FaChevronDown size={10} />
                ) : (
                  <FaChevronRight size={10} />
                )}
                <span className="ms-2">{group}</span>
              </div>

              <Collapse in={isExpanded}>
                <div>
                  {groupPosts.map((post) => {
                    const isSelected = selectedPost?._id === post._id;
                    return (
                      <div
                        key={post._id}
                        onClick={() => onSelectPost(post)}
                        className={`pazza-post-item ${
                          isSelected ? "selected" : ""
                        }`}
                      >
                        <div className="pazza-post-header">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="pazza-post-title-row">
                              {["FACULTY", "ASSISTANT"].includes(
                                post.authorRole
                              ) ? (
                                <span className="pazza-instr-badge">Instr</span>
                              ) : (
                                <span className="pazza-student-badge">Stu</span>
                              )}
                              <span className="pazza-post-title">
                                {post.summary}
                              </span>
                            </div>
                            <div className="pazza-post-preview">
                              {stripHtml(post.details)}
                            </div>
                          </div>
                          <div className="pazza-post-meta-right">
                            <div className="pazza-post-time">
                              {formatTime(post.createdAt)}
                            </div>
                            <div className="pazza-post-indicators">
                              {post.hasStudentAnswer && (
                                <span className="pazza-indicator student">
                                  S
                                </span>
                              )}
                              {post.hasInstructorAnswer && (
                                <span className="pazza-indicator instructor">
                                  i
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Collapse>
            </div>
          );
        })}

        {posts.length === 0 && (
          <div className="pazza-empty">
            No posts yet. Click &quot;New Post&quot; to create one!
          </div>
        )}
      </div>
    </div>
  );
}
