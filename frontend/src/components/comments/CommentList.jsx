import CommentCard from "./CommentsCard";

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-[#1A1A1A]/40 text-sm">No comments yet.</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;