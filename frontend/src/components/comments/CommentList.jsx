import CommentCard from "./CommentCard";

function CommentList({ comments }) {
  return (
    <div>

      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
        />
      ))}

    </div>
  );
}

export default CommentList;