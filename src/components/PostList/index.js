import "./PostList.css";
import { useState } from "react";
import Post from "../Post";
import EditPost from "../EditPost";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

// Icons
import { Avatar } from "@material-ui/core";
import {
  ThumbUp,
  ChatBubbleOutline,
  AccountCircle,
  NearMe,
  ExpandMoreOutlined,
} from "@material-ui/icons";
function PostList({
  id,
  title,
  post,
  postImage,
  completed,
  time,
  name,
  email,
}) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "posts", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "posts", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="post">
      <div className="postTop">
        <div className="postTopInfo">
          <Avatar className="postAvatar" />
          <h3 style={{ marginBottom: "0" }}>
            {name} <br />{" "}
            <p
              style={{
                margin: "5 0 -5px 0px",
                paddingTop: "0",
                fontWeight: "normal",
              }}
            >
              {time}
            </p>
          </h3>{" "}
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
        </div>
        {user ? (
          user.email === email ? (
            <div style={{ textAlign: "right" }}>
              <button
                className="button"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleDelete}
                style={{ textAlign: "right" }}
              >
                {" "}
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </button>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>

      <div className="postBottom">
        <p>{title}</p>
      </div>

      <div className="postImage">
        {postImage ? (
          <img
            src={postImage}
            style={{ borderRadius: "10px" }}
            alt="post-image"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="postBottom">
        <p>{post}</p>
      </div>

      <div className="postOptions">
        <div className="postOption">
          <FavoriteIcon />
          <p>Like</p>
        </div>

        <div className="postOption">
          <ChatBubbleOutline />
          <p>Comment</p>
        </div>

        <div className="postOption">
          <NearMe />
          <p>Share</p>
        </div>

        <div className="postOption">
          <AccountCircle />
          <ExpandMoreOutlined />
        </div>

        {open.view && (
          <Post
            onClose={handleClose}
            title={title}
            post={post}
            open={open.view}
          />
        )}

        {open.edit && (
          <EditPost
            onClose={handleClose}
            toEditTitle={title}
            toEditpost={post}
            open={open.edit}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default PostList;

// <div className="post11">
// <div className="post__header">
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//     }}
//   >
//     {/* <Avatar
//     alt={userName.toLowerCase()}
//     style={{ height: "25px", width: "25px" }}
//   >
//     {userName.charAt(0)}
//   </Avatar> */}
//     <div className="post__headerInfo">
//       {/* <p style={{ fontSize: "14px" }}>{name}</p> */}
//     </div>
//   </div>
// </div>
// {/* headr --> avatar + username + time */}

// {/* image */}

// {/* username + caption */}
// <div className="post__bottom">
//   {user ? (
//     user.email === email ? (
//       <button
//         className="button"
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         onClick={handleDelete}
//         style={{ textAlign: "right" }}
//       >
//         Delete
//       </button>
//     ) : (
//       <></>
//     )
//   ) : (
//     <></>
//   )}
//   <p style={{ textAlign: "left", marginBottom: "0" }}>
//     <strong>{name}</strong>
//   </p>
//   <p style={{ textAlign: "left", marginBottom: "0" }}>{title} </p>
//   {postImage ? <img className="post__image" src={postImage} /> : ""}
//   {post}
// </div>

// {comments ? (
// comments.map((comment) => (
//   <Comment username={comment.username} comment={comment.comment} />
// ))
// ) : (
// <></>
// )}
// <CommentInput comments={comments} id={id} user={user} />
// </div>
