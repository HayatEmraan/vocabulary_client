/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
  onTextChange?: any;
}

export type QuillEditorRef = Quill | null;

const Editor = forwardRef<QuillEditorRef, EditorProps>(
  ({ onTextChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef<any>(onTextChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
    }, [onTextChange]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );

      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      if (ref) {
        if (typeof ref === "function") {
          ref(quill);
        } else {
          (ref as React.MutableRefObject<QuillEditorRef>).current = quill;
        }
      }

      quill.on("text-change", (...args) => {
        if (onTextChangeRef.current) {
          onTextChangeRef.current(...args);
        }
      });

      return () => {
        if (ref) {
          if (typeof ref === "function") {
            ref(null);
          } else {
            (ref as React.MutableRefObject<QuillEditorRef>).current = null;
          }
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div
        style={{
          height: "150px",
        }}
        ref={containerRef}></div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
