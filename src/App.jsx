import { useState } from "react";
import {
  handleIncrement,
  handleDecrement,
  addReplyContainer,
} from "./funciones/useCommentHandlers";
import { handleDelete, handleCancel } from "./funciones/confirmDelete";
import { toggleEdit } from "./funciones/editFuntion";
import {
  handleSendComment,
  handleSendReply,
} from "./funciones/commentAndReply";
import useElapsedTime from "./funciones/cronometro";
import "./App.css";

function App() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const twoWeekAgo = new Date();
  twoWeekAgo.setDate(twoWeekAgo.getDate() - 14);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "amyrobson",
      text: "Impressivel Though it seems the drag features could be improved. But overall it looks incredible. Youve nailed the design and the responsiveness at various breakpoints works really well.",
      timeElapsed: "1 month ago",
      counter: 0,
      userImage: "image-amyrobson.png",
      timestamp: oneMonthAgo.getTime(),
      isDisabled: true,
      isClicked: false,
      replies: [],
      parentId: null,
    },
    {
      id: 2,
      username: "maxblagun",
      text: "woah. your project looks awesome How long have you been coding for? i´m still new. but think i want to dive into react as well soon. perhaps you can give me an insight on where i can learn React? thanks!",
      timeElapsed: "1 month ago",
      counter: 0,
      userImage: "image-maxblagun.png",
      timestamp: twoWeekAgo.getTime(),
      isDisabled: true,
      isClicked: false,
      replies: [
        {
          id: 3,
          username: "ramsesmiron",
          text: "woah. your project looks awesome How long have you been coding for? i´m still new. but think i want to dive into react as well soon. perhaps you can give me an insight on where i can learn React? thanks!",
          timeElapsed: "1 month ago",
          counter: 0,
          userImage: "image-ramsesmiron.png",
          timestamp: oneWeekAgo.getTime(),
          isDisabled: true,
          isClicked: false,
          parentId: 2,
        },
      ],
      parentId: null,
    },
  ]);

  const incrementComment = (id) => {
    handleIncrement(id, setComments);
  };

  const decrementComment = (id) => {
    handleDecrement(id, setComments);
  };
  useElapsedTime(comments, setComments);

  const [newCommentText, setNewCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [activeReply, setActiveReply] = useState([]);

  const [confirmationId, setConfirmationId] = useState(null);
  

  return (
    <>
      <div className="containerMaster">
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
            <div key={comment.id} className="replyAndCommentContainer">
              <div
                className={`firstCommentContainer ${comment.className || ""}`}
              >
                <div className="counterContainer">
                  <button onClick={() => incrementComment(comment.id)}>
                    <img
                      src="icon-plus.svg"
                      alt="button-Plus"
                      className="counterImg"
                    />
                  </button>
                  <p className="counter">{comment.counter}</p>
                  <button
                    className="countImg"
                    onClick={() => decrementComment(comment.id)}
                  >
                    <img src="icon-minus.svg" alt="button-Minus" />
                  </button>
                </div>
                <div className="commentContainer">
                  <div className="comment">
                    <div className="peopleDate">
                      <img src={comment.userImage} alt="userImg" />
                      <p className="amyRobson">{comment.username}</p>
                      {comment.isUserComment && <p className="you">you</p>}
                      <p className="date">{comment.timeElapsed}</p>
                    </div>
                    {!comment.isUserComment && (
                      <button
                        className="replyImg"
                        onClick={() =>
                          addReplyContainer(comment.id, setActiveReply)
                        } 
                      >
                        <img
                          className="reply"
                          src="icon-reply.svg"
                          alt="reply"
                        />
                        Reply
                      </button>
                    )}
                    {comment.isUserComment && (
                      <div>
                        <button
                          className="replyImg"
                          onClick={() => toggleEdit(comment.id, setComments)}
                        >
                          <img src="icon-edit.svg" alt="icon-edit" />
                          {comment.isClicked ? "Save" : "Edit"}
                        </button>
                        <button
                          className="replyImg"
                          onClick={() => setConfirmationId(comment.id)}
                        >
                          <img src="icon-delete.svg" alt="button-delete" />
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                  <textarea
                    disabled={comment.isDisabled}
                    className="otherUserText"
                    maxLength={320}
                    value={comment.text}
                    onChange={(e) =>
                      setComments((prevComments) =>
                        prevComments.map((c) =>
                          c.id === comment.id
                            ? { ...c, text: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                </div>
              </div>

              {activeReply.includes(comment.id) && (
                <div className="userInputContainer">
                  <img src="image-juliusomo.png" alt="userImg" />
                  <textarea
                    placeholder="Add a reply..."
                    maxLength={325}
                    value={replyTexts[comment.id] || ""}
                    onChange={(e) =>
                      setReplyTexts((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="button"
                    onClick={() => {
                      handleSendReply(
                        comment.id,
                        replyTexts[comment.id] || "",
                        setComments,
                        () =>
                          setReplyTexts((prev) => {
                            const newTexts = { ...prev };
                            delete newTexts[comment.id];
                            return newTexts;
                          }),
                        setActiveReply
                      );
                    }}
                  >
                    REPLY
                  </button>
                </div>
              )}

              {comment.replies.map((reply) => (
                <div key={reply.id} className={`replyContainer ${reply.isNew ? "reply--new" : ""}`}>
                  <div className="counterContainer">
                    <button onClick={() => incrementComment(reply.id)}>
                      <img src="icon-plus.svg" alt="button-Plus" className="counterImg" />
                    </button>
                    <p className="counter">{reply.counter}</p>
                    <button onClick={() => decrementComment(reply.id)}>
                      <img src="icon-minus.svg" alt="button-Minus" />
                    </button>
                  </div>
                  <div className="commentContainer">
                    <div className="comment">
                      <div className="peopleDate">
                        <img src={reply.userImage} alt="userImg" />
                        <p className="amyRobson">{reply.username}</p>
                        {reply.isUserReply && <p className="you">you</p>}
                        <p className="date">{reply.timeElapsed}</p>
                      </div>
                      <div>
                        {reply.isUserReply && (
                          <div>
                            <button
                              className="replyImg"
                              onClick={() => toggleEdit(reply.id, setComments)}
                            >
                              <img src="icon-edit.svg" alt="icon-edit" />
                              {reply.isClicked ? "Save" : "Edit"}
                            </button>
                            <button
                              className="replyImg"
                              onClick={() => setConfirmationId(reply.id)}
                            >
                              <img src="icon-delete.svg" alt="button-delete" />
                              delete
                            </button>
                          </div>
                        )}
                        {!reply.isUserReply && (
                          <button
                            className="replyImg"
                            onClick={() => addReplyContainer(reply.id, setActiveReply)}
                          >
                            <img className="reply" src="icon-reply.svg" alt="reply" />
                            Reply
                          </button>
                        )}
                      </div>
                    </div>
                    <textarea
                      disabled={reply.isDisabled}
                      className="otherUserText"
                      maxLength={320}
                      value={reply.text}
                      onChange={(e) =>
                        setComments((prevComments) =>
                          prevComments.map((c) =>
                            c.id === comment.id
                              ? {
                                  ...c,
                                  replies: c.replies.map((r) =>
                                    r.id === reply.id ? { ...r, text: e.target.value } : r
                                  ),
                                }
                              : c
                          )
                        )
                      }
                    />
                  </div>
                </div>  
              ))}
            </div>
          ))}

        <div className="userInputContainer original">
          <img className="userAvatar" src="image-juliusomo.png" alt="userImg" />
          <textarea
            placeholder="Add a comment..."
            maxLength={325}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            className="button"
            onClick={() =>
              handleSendComment(
                null,
                newCommentText,
                setComments,
                setNewCommentText,
                setActiveReply
              )
            }
          >
            SEND
          </button>
        </div>
      </div>
      {confirmationId && (
      <div className="overlay">
        <div className="confirmation-box">
          <p>Delete Comment</p>
          <p>
            Are you sure you want to delete this
            <br />
            comment? this will remove the comment
            <br />
            and can´t be undone
          </p>
          <div className="buttonContainer">
            <button
              className="confirm-delete"
              onClick={() =>
                handleDelete(confirmationId, setComments, setConfirmationId)
              }
            >
              Yes, delete
            </button>
            <button
              className="cancel-delete"
              onClick={() => handleCancel(setConfirmationId)}
            >
              No, cancel
            </button>
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default App;