import Modal from "../Modal";
import { useState } from "react";
import "./EditPost.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function EditTask({ open, onClose, toEditTitle, toEditPost, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [post, setPost] = useState(toEditPost);

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "posts", id);
    try {
      await updateDoc(taskDocRef, {
        title: title,
        post: post,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
