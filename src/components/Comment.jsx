import { useState } from "react";

const Comment = ({
  id,
  comment,
  isLiked,
  replies = [],
  handleReply,
  toggleLike,
  handleEdit,
  handleDelete,
}) => {
  const [isEditing, setIsEditing] = useState(comment == "");
  const [value, setValue] = useState(comment);
  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      handleEdit(id, value);
      setIsEditing(false);
    }
  };
  console.log("redner", id, comment);
  return (
    <div>
      {isEditing && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleSubmit}
        />
      )}
      {!isEditing && <p>{comment}</p>}
      <div>
        <button onClick={() => toggleLike(id)}>
          {isLiked ? "UnLike" : "Like"}
        </button>
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => handleReply(id)}> Reply</button>
      </div>
      <div style={{ paddingLeft: "10px" }}>
        {replies.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            toggleLike={toggleLike}
            handleReply={handleReply}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
