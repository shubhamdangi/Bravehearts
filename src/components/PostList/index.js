import "./PostList.css";
import { useState } from "react";
import Post from "../Post";
import { doc, updateDoc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

// Icons
import { Avatar } from "@material-ui/core";

function PostList({
  id,
  title,
  post,
  postImage,
  completed,
  time,
  name,
  email,
  comments,
}) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });
  const [user, loading, error] = useAuthState(auth);
  const [comment, setComment] = useState();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };
  const redirect = () => {
    navigate("/login");
  };
  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "posts", id);
    try {
      await addDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async (e) => {
    const taskDocRef = doc(db, "posts", id);
    try {
      await updateDoc(taskDocRef, {
        comments: comment,
      });
      setComment("");
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

  /* function to update firestore */

  return (
    <div className="post">
      <div className="postTop">
        <div className="postTopInfo">
          <Avatar className="postAvatar" />
          <h3 style={{ marginBottom: "0" }}>
            {name} <br />
            <p
              style={{
                margin: "5 0 -5px 0px",
                paddingTop: "0",
                fontWeight: "normal",
              }}
            >
              {time}
            </p>
          </h3>
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
        <h6>{title}</h6>
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
        <p className="post-text">{post}</p>
      </div>
      {comments ? (
        <div className="comment">
          <p style={{ fontSize: "13px" }}>
            <span style={{ fontWeight: "550" }}>{name}</span> {comments}
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="postOptions">
        <textarea
          class="form-control center-block container-fluid post__text	"
          id="exampleFormControlTextarea6"
          rows="1"
          column="2"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          style={{
            border: "none",
            // marginBottom: "5px",
            backgroundColor: "#EEEEEE",
          }}
          placeholder="add your comment.."
        ></textarea>
        <Button
          onClick={() => {
            user ? handleUpdate() : redirect();
          }}
        >
          comment
        </Button>
      </div>
    </div>
  );
}

export default PostList;
