import React from "react";
import SupportImage from "./flag.jpg";
import "./Support.css";
import { Link } from "react-router-dom";

function Bhopal() {
  return (
    <>
      <div className="pagedata">
        <div className="SupportHead">
          <img
            src={SupportImage}
            alt="support-image"
            className="SupportImage"
          />
          {/* <h4>Bhopal Resources.</h4> */}
          <hr />
        </div>
        <div className="contents">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a href="https://ndf.gov.in/" target="blank">
                <h3>▷ National Defence Fund (NDF)</h3>
              </a>
              <p>Online Contributions / Donations to National Defence Fund</p>
            </li>

            <li class="list-group-item">
              <a
                href="https://indianarmy.nic.in/Site/FormTemplete/frmTempSimple.aspx?MnId=MtzjG3mK+HYaULDNNkAPrg==&ParentID=LTNKu0LYj4BTtXVxZbrcxA=="
                target="blank"
              >
                <h3>▷ Army Welfare Funds For Donation / Contribute</h3>
              </a>
              <p>
                Make a contribution to the families of the Martyrs of the Indian
                Army.
              </p>
            </li>
            <li class="list-group-item">
              <a
                href="https://bharatkeveer.gov.in/viewMartyrsGalleryPage"
                target="blank"
              >
                <h3>▷ Bharat Ke Veer Portal</h3>
              </a>
              <p>Make a contribution in the honor of Bravehearts</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Bhopal;
