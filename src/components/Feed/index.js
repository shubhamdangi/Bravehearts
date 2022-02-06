import "./Feed.css";
import PostList from "../PostList";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

function Feed() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/publish");
  };

  /* function to get all posts from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "posts"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
        setLoading(false)
      );
    });
  }, []);

  return (
    <div className="feed">
      <div>
        <div className="feed-top">
          {/* <img className="banner-image" src={Banner} alt="banner-image" /> */}
          <Button
            style={{
              alignItems: "center",
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#5F6769",
              textTransform: "none",
              // marginLeft: "68%",
              width: "44%",
              border: "2px solid white",
              color: "white",
            }}
            // disabled={!post}
            onClick={handleClick}
            variant="contained"
            color="primary"
          >
            Post quotes or poems honoring our Brave Soldiers
          </Button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {posts.map((task) => (
              <PostList
                id={task.id}
                key={task.id}
                postImage={task.data.postImage}
                title={task.data.title}
                post={task.data.post}
                name={task.data.name}
                email={task.data.email}
                time={task.data.time}
                comments={task.data.comments}
              />
            ))}
          </div>
        )}
      </div>

      {/* {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )} */}
    </div>
  );
}

export default Feed;
