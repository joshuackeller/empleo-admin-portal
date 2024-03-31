import { Dispatch, SetStateAction, useState } from "react";
import { LinkBubbleMenu, TableBubbleMenu } from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import dynamic from "next/dynamic";

const DynamicRichTextEditor = dynamic(
  () => import("mui-tiptap").then((mod) => mod.RichTextEditor),
  { ssr: false }
);

interface EditorProps {
  value?: string;
  setValue:
    | Dispatch<SetStateAction<string | undefined>>
    | Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function Editor({
  value,
  setValue,
  placeholder = "Enter your company information here...",
}: EditorProps) {
  const extensions = useExtensions({
    placeholder: placeholder,
  });
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  return (
    <>
      <DynamicRichTextEditor
        className="shadow-sm tiptap"
        extensions={extensions}
        content={value}
        onUpdate={(content) => setValue(content.editor.getHTML())}
        editable={isEditable}
        renderControls={(editor) => <EditorMenuControls editor={editor} />}
        RichTextFieldProps={{
          MenuBarProps: {
            hide: !showMenuBar,
          },
        }}
      >
        {(editor) => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </DynamicRichTextEditor>
    </>
  );
}
