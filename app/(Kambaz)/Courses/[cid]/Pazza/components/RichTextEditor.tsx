"use client";

import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your content here...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border rounded">
      <div className="pazza-editor-toolbar">
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("bold")}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("italic")}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("underline")}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("insertUnorderedList")}
        >
          • List
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("insertOrderedList")}
        >
          1. List
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCommand("createLink", url);
          }}
        >
          🔗
        </button>
        <button
          type="button"
          className="pazza-editor-btn"
          onClick={() => execCommand("formatBlock", "<pre>")}
        >
          {"</>"}
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="pazza-editor-content"
        style={{ minHeight }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
}
