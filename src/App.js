import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./app.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { posts } from "./data";

function App() {
const [username, setUsername] = useState("");
const [user, setUser] = useState("");
const [socket, setSocket] = useState(null);

useEffect(() => {
  setSocket(io("http://localhost:5000"));
}, []);

useEffect(() => {
  socket?.emit("newUser", user);
}, [socket, user]);

  return (
    <div className="container">
      { user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      ) }
      
    </div>
  );
}

export default App;
