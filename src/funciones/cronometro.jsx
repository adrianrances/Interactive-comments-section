import { useEffect } from "react";

const useElapsedTime = (comments, setComments) => {
  useEffect(() => {
    const updateElapsedTime = (timestamp) => {
      const now = Date.now();
      const elapsedMs = now - timestamp;

      const seconds = Math.floor(elapsedMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
      if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    };

    const intervalId = setInterval(() => {
      setComments((prevComments) =>
        prevComments.map((comment) => ({
          ...comment,
          timeElapsed: updateElapsedTime(comment.timestamp),
          replies: comment.replies.map((reply) => ({
            ...reply,
            timeElapsed: updateElapsedTime(reply.timestamp),
          })),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setComments]);
};

export default useElapsedTime;
