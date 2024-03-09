import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import dynamic from "next/dynamic";

const DynamicRichTextEditor = dynamic(
  () => import("mui-tiptap").then((mod) => mod.RichTextEditor),
  { ssr: false }
);

interface EditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function Editor({ value, setValue }: EditorProps) {
  const extensions = useExtensions({
    placeholder: "Enter your company information here...",
  });
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const [submittedContent, setSubmittedContent] = useState("");

  return (
    <>
      <DynamicRichTextEditor
        className="shadow-sm tiptap"
        extensions={extensions}
        content={value}
        onUpdate={(content) => setValue(content.editor.getHTML())}
        editable={isEditable}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          // The "outlined" variant is the default (shown here only as
          // example), but can be changed to "standard" to remove the outlined
          // field border from the editor
          // variant: "outlined",
          MenuBarProps: {
            hide: !showMenuBar,
          },
          // Below is an example of adding a toggle within the outlined field
          // for showing/hiding the editor menu bar, and a "submit" button for
          // saving/viewing the HTML content
          // footer: (
          //   <Stack
          //     direction="row"
          //     spacing={2}
          //     sx={{
          //       borderTopStyle: "solid",
          //       borderTopWidth: 1,
          //       borderTopColor: (theme) => theme.palette.divider,
          //       py: 1,
          //       px: 1.5,
          //     }}
          //   >
          //     <MenuButton
          //       value="formatting"
          //       tooltipLabel={showMenuBar ? "Hide toolbar" : "Show toolbar"}
          //       size="small"
          //       onClick={() => setShowMenuBar((currentState) => !currentState)}
          //       selected={showMenuBar}
          //       IconComponent={TextFields}
          //     />

          //     <MenuButton
          //       value="formatting"
          //       tooltipLabel={
          //         isEditable
          //           ? "Prevent edits (use read-only mode)"
          //           : "Allow edits"
          //       }
          //       size="small"
          //       onClick={() => setIsEditable((currentState) => !currentState)}
          //       selected={!isEditable}
          //       IconComponent={isEditable ? LockOpen : Lock}
          //     />

          //     <Button variant="outlined" size="small">
          //       Save
          //     </Button>
          //   </Stack>
          // ),
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </DynamicRichTextEditor>

      {/* {submittedContent ? (
        <>
          <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
            <code>{submittedContent}</code>
          </pre>

          <Box mt={3}>
            <Typography variant="overline" sx={{ mb: 2 }}>
              Read-only saved snapshot:
            </Typography>

            <RichTextReadOnly
              content={submittedContent}
              extensions={extensions}
            />
          </Box>
        </>
      ) : (
        <>
          Press “Save” above to show the HTML markup for the editor content.
          Typically you’d use a similar <code>editor.getHTML()</code> approach
          to save your data in a form.
        </>
      )} */}
    </>
  );
}
