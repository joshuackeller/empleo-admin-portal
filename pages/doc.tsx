import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const RESUME_URL =
  "https://empleo-files.s3.us-east-1.amazonaws.com/gcoiTVIRYQ1Y/resumes/RP6sfZkSAf7k?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUDWNOTVQDAMQG2GF%2F20240309%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240309T154017Z&X-Amz-Expires=3600&X-Amz-Signature=06c1fa94befabefb6f54a37a3570331276ce0b23419bb29f94f2b348a7fdeb15&X-Amz-SignedHeaders=host&x-id=GetObject";
const COVER_LETTER_URL =
  "https://empleo-files.s3.us-east-1.amazonaws.com/gcoiTVIRYQ1Y/coverLetter/flgOM8u1Xwwc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUDWNOTVQDAMQG2GF%2F20240309%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240309T154017Z&X-Amz-Expires=3600&X-Amz-Signature=ce4a299acb8873eacf04018ed50329b1470cc1f1352603362555fab140973422&X-Amz-SignedHeaders=host&x-id=GetObject";

const Page = () => {
  const docs = [
    {
      uri: RESUME_URL,
      fileType: "docx",
    },
  ];

  return (
    <div>
      <div>hello there</div>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default Page;
