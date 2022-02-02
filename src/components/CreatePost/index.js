import { useState } from "react";
import "./createPost.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { Container } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PublicIcon from "@material-ui/icons/Public";

function CreatePost({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, loading, error] = useAuthState(auth);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        user: user.email,
        created: Timestamp.now(),
      });
      //   onClose();
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      {user ? (
        <Container>
          <label for="exampleFormControlTextarea6">
            Shadow and placeholder
          </label>
          <textarea
            class="form-control center-block container-fluid post__text	"
            id="exampleFormControlTextarea6"
            rows="2"
            column="2"
            onChange={(e) => setTitle(e.target.value.toUpperCase())}
            value={title}
            style={{
              border: "none",
              marginBottom: "5px",
              backgroundColor: "#EEEEEE",
            }}
            placeholder="Title.."
          ></textarea>{" "}
          <textarea
            class="form-control center-block container-fluid post__text	"
            id="exampleFormControlTextarea6"
            rows="7"
            column="2"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{
              border: "none",
              backgroundColor: "#EEEEEE",
            }}
            placeholder="Write your masterpiece here.."
          ></textarea>{" "}
          <br />{" "}
          <Button
            style={{
              alignItems: "center",
              textAlign: "center",
              borderRadius: "15px",
              backgroundColor: "#4E9F3D",
              marginLeft: "44%",
            }}
            disabled={!description}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            // onClick={handleOpen}
          >
            Publish&nbsp;
          </Button>
        </Container>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> SignIn to Post</p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
