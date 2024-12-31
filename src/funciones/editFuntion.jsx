export const toggleEdit = (id, setComments) => {
  setComments((prevComments) =>
    prevComments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          isDisabled: !comment.isDisabled,
          isClicked: !comment.isClicked,
        };
      }

      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === id
              ? {
                  ...reply,
                  isDisabled: !reply.isDisabled,
                  isClicked: !reply.isClicked,
                }
              : reply
          ),
        };
      }

      return comment;
    })
  );
};
