// import { TextStyle } from "@tiptap/extension-text-style";

// export const FontSize = TextStyle.extend({
//   name: "fontSize",

//   defaultOptions: {
//     types: ["textStyle"],
//   },

//   parseHTML() {
//     return [
//       {
//         style: "font-size",
//         getAttrs: (value) => {
//           const match = value.match(/\d+/);
//           return { fontSize: match ? match[0] : null };
//         },
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     let { fontSize } = HTMLAttributes;

//     return ["span", { style: `font-size: ${fontSize}px` }, 0];
//   },

//   addAttributes() {
//     return {
//       fontSize: {
//         default: null,
//         renderHTML: (attributes) => {
//           if (!attributes.fontSize) {
//             return {};
//           }

//           return {
//             style: `font-size: ${attributes.fontSize}px`,
//           };
//         },
//         parseHTML: (element) => {
//           return {
//             fontSize: element.style.fontSize.replace("px", ""),
//           };
//         },
//       },
//     };
//   },
// });
