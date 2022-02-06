import "./Post.css";

function Post({ onClose, open, title, post, postImage }) {
  return (
    <div className="taskItem">
      <h2>{title}</h2>
      {/* <img src={postImage} alt="img" /> */}
      <p>{post}</p>
      <hr />
    </div>
  );
}

export default Post;
