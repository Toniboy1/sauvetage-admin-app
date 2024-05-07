"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const border = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "10px",
  marginBottom: "20px",
};
/**
 * Remark component
 * @returns JSX.Element
 */
const Remark = (): JSX.Element => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.
  return (
    <div style={border}>
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
};
export default Remark;
