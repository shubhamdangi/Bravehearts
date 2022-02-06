import { useState, useEffect } from "react";
import "./createPost.css";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

function CreatePost({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  //get name
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    // if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  //date time function
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var currentdate = new Date();
  var datetime =
    monthNames[currentdate.getMonth()] +
    " " +
    currentdate.getDate() +
    " · " +
    currentdate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  function time1() {
    setTime(datetime);
  }

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchUserName();

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        post: post,
        completed: false,
        email: user.email,
        created: serverTimestamp(),
        name: name,
        time: time,
        // comments: {},

        // photoUrl: postImage,
      }).then((docum) => {
        if (image) {
          const storage = getStorage();
          const storageRef = ref(storage, `images/${docum.id}`);
          const uploadTask = uploadBytesResumable(
            storageRef,
            image,
            "data_url"
          );
          //   removeImage();
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                setDoc(
                  doc(db, "posts", docum.id),
                  { postImage: URL },
                  { merge: true }
                );
              });
            }
          );
        }
      });

      setTitle("");
      setPost("");
      setImage(null);
      var preview1 = document.getElementById("image-1-preview");
      preview1.style.display = "none";
      // navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {user ? (
        <Container>
          {" "}
          <div style={{ textAlign: "center" }}>
            <h4>Create Post</h4>
            <br />
          </div>
          <textarea
            class="form-control center-block container-fluid post__text	"
            id="exampleFormControlTextarea6"
            rows="2"
            column="2"
            onChange={(e) => setTitle(e.target.value)}
            onClick={time1}
            value={title}
            style={{
              border: "none",
              marginBottom: "5px",
              backgroundColor: "#EEEEEE",
              color: "black",
            }}
            placeholder="Title.."
          ></textarea>
          <div className="desc">
            <textarea
              class="form-control center-block container-fluid post__text	"
              id="exampleFormControlTextarea6"
              rows="9"
              column="2"
              onChange={(e) => setPost(e.target.value)}
              onClick={time1}
              value={post}
              style={{
                border: "none",
                backgroundColor: "#EEEEEE",
                color: "black",
              }}
              placeholder="Write your post here.."
            ></textarea>{" "}
          </div>
          <div className="imageUpload__bottom">
            <div className="image-upload">
              <label htmlFor="file-input">
                <CameraAltIcon style={{ marginTop: "5px" }} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            {/* <Button onClick={uploadPO}>Upload</Button> */}
          </div>
          <br />{" "}
          <Button
            style={{
              alignItems: "center",
              textAlign: "center",
              borderRadius: "15px",
              //   backgroundColor: "#4E9F3D",
              marginLeft: "68%",
              border: "2px solid white",
              color: "white",
            }}
            disabled={!post}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            // onClick={handleOpen}
          >
            Publish&nbsp;
          </Button>
          <div className="imgPreview">
            <img id="image-1-preview" alt="post-image" />
          </div>
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
          <h5>Please Login to Post</h5>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
