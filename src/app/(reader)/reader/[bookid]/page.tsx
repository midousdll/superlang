// export default function ReaderPage() {
//   return (
//     <div className="flex-1 flex flex-col w-full h-full">
//       {/* Reader Page ============================================================================= */}
//       <div className=" bg-orange flex w-full h-full">
//         {/* Source Book ======================================================= */}
//         <div className="flex-1 p-8 text-lg bg-green">
//           <p className="">
//             The text from the book will be displayed here...
//           </p>
//         </div>

//         {/* Translation ======================================================= */}
//         <div className="flex-1 p-8 text-lg bg-blue">
//           <p className="">
//             The Translated tex will be here...
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import ReaderCanvas from "@/components/reader/ReaderCanvas";

const MOCK_SEGMENTS = [
  {
    id: "s1",
    originalEn: "Once when I was six years old I saw a magnificent picture in a book.",
    translations: {
      fr: "Lorsque j'avais six ans j'ai vu une magnifique image dans un livre.",
      ar: "عندما كنت في السادسة من عمري رأيت صورة رائعة في كتاب.",
    },
  },
  {
    id: "s2",
    originalEn: "It was a picture of a boa constrictor in the primeval forest.",
    translations: {
      fr: "C'était une image d'un serpent boa dans la forêt vierge.",
      ar: "كانت صورة لأفعى البواء في الغابة البدائية.",
    },
  },
];

export default function ReaderPage() {
  return <ReaderCanvas segments={MOCK_SEGMENTS} />;
}