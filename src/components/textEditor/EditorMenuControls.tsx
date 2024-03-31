import { useTheme } from "@mui/material";
import {
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonImageUpload,
  MenuButtonAddImage,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  isTouchDevice,
} from "mui-tiptap";
import { Video } from "./video";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import React from "react";

export default function EditorMenuControls({ editor }: { editor: any }) {
  const theme = useTheme();

  // const handleAddVideo = () => {
  //   const url = window.prompt("Enter the video URL");
  //   if (url) {
  //     editor
  //       .chain()
  //       .focus()
  //       .insertContent(`<iframe src="${url}"></iframe>`)
  //       .run();
  //   }
  // };

  const handleAddVideo = () => {
    const videoSrc = editor.getAttributes("video").src;
    const url = window.prompt("Enter the video URL", videoSrc);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.isActive("video") ? editor.commands.deleteSelection() : false;
      return;
    }

    // validate url is from youtube or vimeo
    if (!url.match(/youtube|vimeo/)) {
      return alert("Sorry, your video must be hosted on YouTube or Vimeo.");
    }

    let srcCheck = url.match(/src="(?<src>.+?)"/); // get the src value from embed code if all pasted in
    let src = srcCheck?.groups?.src ?? url; // use src or if just url in input use that

    // check youtube url is correct
    if (
      url.match(/youtube/) &&
      !src.match(/^https:\/\/www\.youtube\.com\/embed\//)
    ) {
      return alert(
        "Sorry, your YouTube embed URL should start with https://www.youtube.com/embed/ to work."
      );
    }

    // check vimeo url is correct
    if (
      url.match(/vimeo/) &&
      !src.match(/^https:\/\/player\.vimeo\.com\/video\//)
    ) {
      return alert(
        "Sorry, your Vimeo embed URL should start with https://player.vimeo.com/video/ to work."
      );
    }

    editor
      .chain()
      .focus()
      .insertContent(`<iframe src="${src}"></iframe>`)
      .run();
  };

  return (
    <MenuControlsContainer>
      <MenuSelectHeading />
      <MenuDivider />
      <MenuSelectFontSize />
      <MenuDivider />
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuButtonSubscript />
      <MenuButtonSuperscript />
      <MenuDivider />
      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />
      <MenuDivider />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />
      <MenuDivider />
      <MenuButtonAddImage
        tooltipLabel="Embed a video"
        IconComponent={OndemandVideoIcon}
        onClick={handleAddVideo}
      />
      <MenuDivider />
      <MenuButtonEditLink />
      <MenuDivider />
      <MenuSelectTextAlign />
      <MenuDivider />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />
      <MenuButtonTaskList />
      {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}
      <MenuDivider />
      <MenuButtonBlockquote />
      <MenuDivider />
      <MenuButtonCode />
      <MenuButtonCodeBlock />
      <MenuDivider />
      <MenuButtonHorizontalRule />
      <MenuButtonAddTable />
      <MenuDivider />
      <MenuButtonRemoveFormatting />
      <MenuDivider />
      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
