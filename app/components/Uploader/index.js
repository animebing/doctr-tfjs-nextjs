import { useDropzone } from "react-dropzone";

export default ({
  children,
  onUpload,
}) => {
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((acceptedFile) => {
      onUpload({
        source: acceptedFile,
        image: URL.createObjectURL(acceptedFile),
      });
    });
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': [ '.jpg', '.jpeg' ],
      'image/png': [],
      'image/webp': [],
    },
    onDrop,
    multiple: false,
  });
  
  return (
    <div className="h-56" {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
