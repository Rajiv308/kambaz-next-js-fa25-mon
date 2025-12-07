/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaFolder } from "react-icons/fa";

interface FolderFiltersProps {
  folders: any[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string) => void;
}

export default function FolderFilters({
  folders,
  selectedFolder,
  onSelectFolder,
}: FolderFiltersProps) {
  return (
    <div className="pazza-folders">
      {folders.map((folder) => {
        const isSelected = selectedFolder === folder._id;
        return (
          <button
            key={folder._id}
            onClick={() => onSelectFolder(folder._id)}
            className={`pazza-folder-btn ${isSelected ? "selected" : ""}`}
          >
            <FaFolder size={12} className="pazza-folder-icon" />
            {folder.name}
          </button>
        );
      })}
    </div>
  );
}
