import React from "react";
import "./Profile.css";



function Profile() {
  return (
    <section id="pet">
      <h1>YOUR PETS</h1>
      <div className="container pet__container">
        <article className="pet__item">
          <div className="pet__item-image">
            <img
              src="https://i.pinimg.com/564x/da/70/ce/da70ce64dc989b1bad37a033372176a5.jpg"
              alt=""
            />
          </div>
          <div className="pet__item-cnt">
            <div className="petname-titles">
              <h3>Pet Name</h3>
              <h4>Location</h4>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Profile;
