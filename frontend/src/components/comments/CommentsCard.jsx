function CommentCard({ comment }) {
  return (
    <div className="border-b py-4">

      <h3 className="font-bold">
        {comment.user}
      </h3>

      <p>{comment.content}</p>

    </div>
  );
}

export default CommentCard;