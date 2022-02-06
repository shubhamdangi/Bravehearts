import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Flag from "../Header/flag.png";

function Footer() {
  return (
    <div>
      <hr />
      <footer class="page-footer font-small  special-color-dark pt-4">
        <div class="container">
          <ul class="list-unstyled list-inline text-center">
            <li class="list-inline-item">
              <a
                href="https://twitter.com/ishubhamdangi"
                class="btn-floating btn-tw mx-1"
                style={{ color: "grey" }}
              >
                <i class="fab fa-lg fa-twitter"> </i>
              </a>
            </li>

            <li class="list-inline-item">
              <a
                href="https://www.linkedin.com/in/ishubhamdangi"
                class="btn-floating btn-li mx-1"
                style={{ color: "grey" }}
              >
                <i class="fab fa-lg fa-linkedin-in"> </i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="https://github.com/shubhamdangi"
                class="btn-floating btn-fb fa-lg mx-1 "
                style={{ color: "grey" }}
              >
                <i class="fab fa-github"> </i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="mailto:ishubhamdangi@gmail.com"
                class="btn-floating btn-mail  mx-1"
                style={{ color: "grey" }}
              >
                <i class=" fas fa-envelope fa-lg"> </i>
              </a>
            </li>
          </ul>
          <div
            class="footer-copyright text-center py-3"
            style={{ marginTop: "-20px", marginBottom: "15px" }}
          >
            <img
              src={Flag}
              alt="image"
              // className="SupportImage"
              style={{
                width: "35px",
                height: "35px",
                margin: "-10px 0 -10px 0",
              }}
            />
            Bravehearts by{" "}
            <a
              style={{ color: "grey", textDecoration: "none" }}
              href="https://shubhamdangi.me"
            >
              Shubham Dangi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
