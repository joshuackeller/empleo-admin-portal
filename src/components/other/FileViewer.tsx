import { FileType } from "@/src/utilities/interfaces";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

interface FileViewProps {
  uri: string;
  fileType: FileType;
}

const FileViewer = ({ uri, fileType }: FileViewProps) => {
  const docs = [
    {
      uri: uri,
      fileType: fileType === FileType.unknown ? undefined : fileType,
    },
  ];

  return (
    <div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{
          pdfVerticalScrollByDefault: true,
          header: {
            disableHeader: true,
          },
        }}
      />
    </div>
  );
};

export default FileViewer;
