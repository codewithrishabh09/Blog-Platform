import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostEditor({
  value,
  onChange,
}) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
    />
  );
}

export default PostEditor;