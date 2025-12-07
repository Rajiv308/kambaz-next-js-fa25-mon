/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Button, Form, ListGroup } from "react-bootstrap";
import { FaFolder, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import PazzaNavBar from "../components/PazzaNavBar";
import * as client from "../client";
import "../pazza.css";

export default function ManageFoldersPage() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const course = courses.find((c: any) => c._id === cid);
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  const [folders, setFolders] = useState<any[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/Courses/${cid}/Pazza`);
      return;
    }
    fetchFolders();
  }, [cid, isFaculty]);

  const fetchFolders = async () => {
    try {
      const data = await client.fetchFoldersForCourse(cid as string);
      setFolders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const newFolder = await client.createFolder(cid as string, {
        name: newFolderName.trim(),
      });
      setFolders([...folders, newFolder]);
      setNewFolderName("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFolders.length === 0) return;
    if (!confirm(`Delete ${selectedFolders.length} folder(s)?`)) return;
    try {
      await client.deleteFolders(selectedFolders);
      setFolders(folders.filter((f) => !selectedFolders.includes(f._id)));
      setSelectedFolders([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = (folder: any) => {
    setEditingId(folder._id);
    setEditName(folder.name);
  };

  const handleSaveEdit = async (folderId: string) => {
    if (!editName.trim()) return;
    try {
      const updated = await client.updateFolder(folderId, {
        name: editName.trim(),
      });
      setFolders(folders.map((f) => (f._id === folderId ? updated : f)));
      setEditingId(null);
      setEditName("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const toggleSelectFolder = (folderId: string) => {
    if (selectedFolders.includes(folderId)) {
      setSelectedFolders(selectedFolders.filter((id) => id !== folderId));
    } else {
      setSelectedFolders([...selectedFolders, folderId]);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="pazza-container">
      <PazzaNavBar
        courseName={
          (course as any)?.number || (course as any)?.name || "Course"
        }
        userName={`${(currentUser as any)?.firstName || ""} ${
          (currentUser as any)?.lastName || ""
        }`}
        isFaculty={isFaculty}
      />

      <div className="pazza-manage">
        <div className="pazza-manage-card">
          <div className="pazza-manage-tabs">
            <span className="text-muted me-3">General Settings</span>
            <span className="text-muted me-3">Customize Q&A</span>
            <span className="fw-bold border-bottom border-2 border-primary pb-1">
              Manage Folders
            </span>
            <span className="text-muted ms-3">Manage Enrollment</span>
            <span className="text-muted ms-3">Create Groups</span>
            <span className="text-muted ms-3">Customize Course Page</span>
            <span className="text-muted ms-3">Piazza Network Settings</span>
          </div>

          <hr />

          <h5 className="pazza-manage-title">Configure Class Folders</h5>
          <p className="text-muted">
            Folders allow you to keep class content organized. When students and
            instructors add a new post, they will be required to specify at
            least one folder for their post.
          </p>

          <div className="pazza-manage-section">
            <h6>Create new folder:</h6>
            <div className="d-flex gap-2 align-items-center mb-3">
              <Form.Control
                type="text"
                placeholder="Add a folder"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFolder()}
                style={{ maxWidth: "300px" }}
              />
              <Button
                variant="primary"
                onClick={handleAddFolder}
                disabled={!newFolderName.trim()}
              >
                Add Folder
              </Button>
            </div>
          </div>

          <div className="pazza-manage-section">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Manage folders:</h6>
              {selectedFolders.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  <FaTrash className="me-1" /> Delete selected folders (
                  {selectedFolders.length})
                </Button>
              )}
            </div>

            <div className="pazza-folder-list">
              {folders.map((folder) => (
                <div key={folder._id} className="pazza-folder-item">
                  <div className="pazza-folder-item-left">
                    <Form.Check
                      type="checkbox"
                      checked={selectedFolders.includes(folder._id)}
                      onChange={() => toggleSelectFolder(folder._id)}
                    />
                    <FaFolder className="text-warning" />
                    {editingId === folder._id ? (
                      <Form.Control
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit(folder._id);
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        size="sm"
                        style={{ width: "200px" }}
                        autoFocus
                      />
                    ) : (
                      <span>{folder.name}</span>
                    )}
                  </div>
                  <div className="pazza-folder-item-actions">
                    {editingId === folder._id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleSaveEdit(folder._id)}
                        >
                          <FaCheck /> Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <FaTimes /> Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleStartEdit(folder)}
                      >
                        <FaEdit /> Edit
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {folders.length === 0 && (
                <div className="pazza-empty">
                  No folders yet. Add one above!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
