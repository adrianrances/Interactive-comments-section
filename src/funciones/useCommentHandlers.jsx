export const handleIncrement = (id, setComments) => {
  setComments((prevComments) =>
    prevComments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, counter: comment.counter + 1 };
      }

      const updatedReplies = comment.replies.map((reply) =>
        reply.id === id ? { ...reply, counter: reply.counter + 1 } : reply
      );

      return { ...comment, replies: updatedReplies };
    })
  );
};


export const handleDecrement = (id, setComments) => {
  setComments((prevComments) =>
    prevComments.map((comment) => {
      if (comment.id === id && comment.counter > 0) {
        return { ...comment, counter: comment.counter - 1 };
      }

      const updatedReplies = comment.replies.map((reply) =>
        reply.id === id && reply.counter > 0
          ? { ...reply, counter: reply.counter - 1 }
          : reply
      );

      return { ...comment, replies: updatedReplies };
    })
  );
};

export const addReplyContainer = (commentId, setActiveReply) => {
  setActiveReply((prev) => {
    if (!Array.isArray(prev)) return [commentId];
    return prev.includes(commentId)
      ? prev.filter((id) => id !== commentId)
      : [...prev, commentId];
  });
};