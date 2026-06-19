function CommentCard({ comment }) {
  return (
    <div className="pb-6 border-b border-[#E8E6E0] last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-[#1A1A1A] text-sm">
          {comment.author_username}
        </h4>
        <span
          className="text-xs text-[#1A1A1A]/40"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {comment.created_at &&
            new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-[#1A1A1A]/75 leading-relaxed">{comment.body}</p>
    </div>
  );
}

export default CommentCard;