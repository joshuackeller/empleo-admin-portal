// import { Mark } from "tiptap";
// import { markInputRule, updateMark, removeMark } from "tiptap-commands";

// /**
//  * FontSize - Extends the built in Mark from tiptap allowing
//  * the editor to <drumroll> set the font-size.
//  */
// export class FontSize extends Mark {
//   get name() {
//     return "fontSize";
//   }

//   get schema() {
//     return {
//       attrs: { fontSize: { default: "1em" } },
//       parseDOM: [
//         {
//           style: "font-size",
//           getAttrs: (value) =>
//             value.indexOf("em") !== -1 ? { fontSize: value } : "",
//         },
//       ],
//       toDOM: (mark) => [
//         "span",
//         { style: `font-size: ${mark.attrs.fontSize}` },
//         0,
//       ],
//     };
//   }

//   commands({ type }) {
//     return (attrs) => {
//       if (attrs.fontSize && attrs.fontSize != "1em") {
//         return updateMark(type, attrs);
//       }
//       return removeMark(type);
//     };
//   }

//   inputRules({ type }) {
//     return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
//   }
// }
