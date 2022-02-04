import { useState, useEffect } from "react";
import "./createPost.css";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { Container } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PublicIcon from "@material-ui/icons/Public";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

function CreatePost({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

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
    time1();
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        post: post,
        completed: false,
        email: user.email,
        created: Timestamp.now(),
        name: name,
        time: time,
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
      //   inputRef.current.value = "";
      //   onClose();
      setTitle("");
      setPost("");
      setImage(null);
      var preview1 = document.getElementById("image-1-preview");
      preview1.style.display = "none";
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      {user ? (
        <Container>
          {" "}
          <br />
          <h4>Create Post</h4>
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
          <div className="desc">
            <textarea
              class="form-control center-block container-fluid post__text	"
              id="exampleFormControlTextarea6"
              rows="9"
              column="2"
              onChange={(e) => setPost(e.target.value)}
              value={post}
              style={{
                border: "none",
                backgroundColor: "#EEEEEE",
              }}
              placeholder="Write your masterpiece here.."
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
          <p> SignIn to Post</p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
