export const handleDelete = (id, setComments, setConfirmationId) => {
  setComments((prevComments) => {
    // Función recursiva para eliminar todas las respuestas asociadas
    const removeReplies = (comments, targetId) =>
      comments
        .filter((comment) => comment.id !== targetId) // Elimina el comentario objetivo
        .map((comment) => ({
          ...comment,
          replies: removeReplies(comment.replies || [], targetId), // Llama recursivamente para las respuestas
        }));

    return removeReplies(prevComments, id);
  });
  setConfirmationId(null);
};
export const handleCancel = (setConfirmationId) => {
  setConfirmationId(null);
};
