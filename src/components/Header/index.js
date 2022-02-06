import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "./flag.png";

import {
  Navbar,
  Nav,
  Container,
  Row,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
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
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink>
            <Navbar.Brand as={Link} to="/">
              <img
                src={Flag}
                alt="image"
                // className="SupportImage"
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "-10px 0 -10px 0",
                }}
              />
              BraveHearts
            </Navbar.Brand>
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink>
                <Nav.Link as={Link} to="/publish">
                  Publish
                </Nav.Link>
              </NavLink>
              {user ? (
                <>
                  <NavLink>
                    <Nav.Link as={Link} to="/dashboard">
                      {name ? name : user?.email}
                    </Nav.Link>
                  </NavLink>
                  <NavLink>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </NavLink>
                  <NavLink>
                    <Nav.Link as={Link} to="/register">
                      Register
                    </Nav.Link>
                  </NavLink>
                </>
              )}
              <NavLink>
                <Nav.Link as={Link} to="/support">
                  Contribute to Indian Army
                </Nav.Link>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
