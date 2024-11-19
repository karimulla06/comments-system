import { useState } from "react";
import Comment from "./components/Comment";
import "./App.css";

function App() {
  const [comments, setComment] = useState([
    {
      id: 1,
      comment: "hello",
      isLiked: true,
      replies: [
        {
          id: 11,
          comment: "hello world",
          isLiked: true,
        },
      ],
    },
  ]);

  const toggleLike = (id) => {
    const newState = JSON.parse(JSON.stringify(comments));
    const getUpdatedComments = (newComments) => {
      return newComments.map((c) => {
        if (c.id == id) {
          c.isLiked = !c.isLiked;
        } else if (c.replies) {
          c.replies = getUpdatedComments(c.replies);
        }
        return c;
      });
    };
    const updatedComments = getUpdatedComments(newState);
    setComment(updatedComments);
  };

  const handleDelete = (id) => {
    const newState = JSON.parse(JSON.stringify(comments));
    const getUpdatedComments = (newComments) => {
      return newComments.reduce((acc, c) => {
        if (c.id != id) {
          if (c.replies) {
            c.replies = getUpdatedComments(c.replies);
          }
          acc.push(c);
        }

        return acc;
      }, []);
    };
    const updatedComments = getUpdatedComments(newState);
    setComment(updatedComments);
  };

  const handleEdit = (id, value) => {
    const newState = JSON.parse(JSON.stringify(comments));
    const getUpdatedComments = (newComments) => {
      return newComments.map((c) => {
        if (c.id == id) {
          c.comment = value;
        }
        if (c.replies) {
          c.replies = getUpdatedComments(c.replies);
        }
        return c;
      });
    };
    const updatedComments = getUpdatedComments(newState);
    setComment(updatedComments);
  };

  const handleReply = (id) => {
    const newState = JSON.parse(JSON.stringify(comments));
    const getUpdatedComments = (newComments) => {
      return newComments.map((c) => {
        if (c.id == id) {
          const newComment = {
            id: Math.random(),
            comment: "",
            isLiked: false,
            replies: [],
          };
          if (c.replies) {
            c.replies = [...c.replies, newComment];
          } else {
            c.replies = [newComment];
          }
        } else if (c.replies) {
          c.replies = getUpdatedComments(c.replies);
        }

        return c;
      });
    };
    const updatedComments = getUpdatedComments(newState);
    setComment(updatedComments);
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          handleDelete={handleDelete}
          toggleLike={toggleLike}
          handleEdit={handleEdit}
          handleReply={handleReply}
        />
      ))}
    </div>
  );
}

export default App;

// Nested Comment - unlimited
// Comment - like, reply, delete
// {
//   id: number
//   comment: string
//   isliked: Boolean
//   replies: comments[]
// }
