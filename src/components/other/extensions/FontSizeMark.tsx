// import { Mark } from "@tiptap/core";

// const FontSize = Mark.create({
//   name: "fontSize",

//   defaultOptions: {
//     levels: [12, 14, 16],
//   },

//   inline: true,

//   group: "inline",

//   attrs: {
//     fontSize: {
//       default: null,
//     },
//   },

//   parseHTML() {
//     return [
//       {
//         style: "font-size",
//         getAttrs: (value) => {
//           return { fontSize: value.replace("px", "") };
//         },
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     let { fontSize } = HTMLAttributes;

//     return ["span", { style: `font-size: ${fontSize}px` }, 0];
//   },
// });
