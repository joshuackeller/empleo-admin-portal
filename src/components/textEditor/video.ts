import { Node, mergeAttributes } from "@tiptap/core";

export const Video = Node.create({
  name: "video", // unique name for the Node
  group: "block", // belongs to the 'block' group of extensions
  selectable: true, // so we can select the video
  draggable: true, // so we can drag the video
  atom: true, // is a single unit

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      {
        style: "display: flex; justify-content: center;",
      },
      [
        "iframe",
        mergeAttributes({
          ...HTMLAttributes,
          src: node.attrs.src,
          style: "width: 560px; height: 315px;",
        }),
      ],
    ];
  },

  addNodeView() {
    return ({ editor, node }) => {
      const div = document.createElement("div");
      div.className = editor.isEditable
        ? "cursor-pointer mx-auto"
        : "mx-auto resize";
      div.style.width = "560px";
      div.style.height = "315px";

      const iframe = document.createElement("iframe");
      if (editor.isEditable) {
        iframe.className = "pointer-events-none";
        iframe.style.width = "560px";
        iframe.style.height = "315px";
      }
      iframe.src = node.attrs.src;
      div.append(iframe);
      return {
        dom: div,
      };
    };
  },
});
