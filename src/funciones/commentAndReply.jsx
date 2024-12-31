export const handleSendComment = (
  parentId,
  newCommentText,
  setComments,
  setNewCommentText,
  setActiveReply
) => {
  if (newCommentText.trim() === "") return; 

  const newComment = {
    id: Date.now(), 
    username: "juliusomo", 
    text: newCommentText,
    timeElapsed: "Just now",
    counter: 0,
    userImage: "image-juliusomo.png",
    timestamp: new Date().getTime(),
    isDisabled: true, 
    isClicked: false, 
    isUserComment: true,
    replies: [],
    parentId: parentId || null,
  };

  setComments((prevComments) => [...prevComments, newComment]);
  setNewCommentText(""); 
  if (setActiveReply) setActiveReply(null); 
};

export const handleSendReply = (
  parentId,
  newReplyText,
  setComments,
  clearReplyText,
  setActiveReply
) => {
  if (!newReplyText.trim()) {
    console.warn("El texto del reply está vacío.");
    return;
  }

  const newReply = {
    id: Date.now(),
    username: "juliusomo",
    text: newReplyText,
    timeElapsed: "just now",
    counter: 0,
    userImage: "image-juliusomo.png",
    timestamp: Date.now(),
    isDisabled: true,
    isClicked: false,
    isUserReply: true,  // Marca que este es un reply del usuario
    parentId,
  };

  setComments((prevComments) =>
    prevComments.map((comment) =>
      comment.id === parentId
        ? {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        : comment
    )
  );

  clearReplyText(); // Limpia el texto del reply
  setActiveReply((prev) => (Array.isArray(prev) ? prev.filter((id) => id !== parentId) : []));
};