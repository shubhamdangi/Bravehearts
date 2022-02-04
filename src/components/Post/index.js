import Modal from "../Modal";
import "./Post.css";

function Post({ onClose, open, title, post, postImage }) {
  return (
    <Modal modalLable="Task Item" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>{title}</h2>
        {/* <img src={postImage} alt="img" /> */}
        <p>{post}</p>
        <hr />
      </div>
    </Modal>
  );
}

export default Post;
