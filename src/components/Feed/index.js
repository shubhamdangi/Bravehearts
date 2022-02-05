import "./Feed.css";
import PostList from "../PostList";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
// import AddTask from "./AddTask";

function Feed() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [posts, setPosts] = useState([]);

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
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        {" "}
        <br />
        <div className="taskManager__posts">
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
      </div>

      {/* {openAddModal && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )} */}
    </div>
  );
}

export default Feed;
