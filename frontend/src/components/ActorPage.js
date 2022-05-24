import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ActorPage.css";
import ActorBiography from "./ActorBiography";

const ActorPage = () => {
  let { personId } = useParams();
  useEffect(() => {
    console.log("Person page", personId);
  }, []);

  const [biography, setBiography] = useState(
    "William Bradley Pitt (born December 18, 1963) is an American actor and film producer. He is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and two Golden Globe Awards for his acting, in addition to a second Academy Award, a second British Academy Film Award, a third Golden Globe Award, and a Primetime Emmy Award as a producer under his production company, Plan B Entertainment.\n\nPitt first gained recognition as a cowboy hitchhiker in the road film Thelma & Louise (1991). His first leading roles in big-budget productions came with the drama films A River Runs Through It (1992) and Legends of the Fall (1994), and the horror film Interview with the Vampire (1994). He gave critically acclaimed performances in the crime thriller Seven (1995) and the science fiction film 12 Monkeys (1995), the latter earning him a Golden Globe Award for Best Supporting Actor and an Academy Award nomination.\n\nPitt starred in Fight Club (1999) and the heist film Ocean's Eleven (2001), as well as its sequels, Ocean's Twelve (2004) and Ocean's Thirteen (2007). His greatest commercial successes have been Ocean's Eleven (2001), Troy (2004), Mr. & Mrs. Smith (2005), World War Z (2013), and Once Upon a Time in Hollywood (2019), for which he won a second Golden Globe Award and the Academy Award for Best Supporting Actor. Pitt's other Academy Award nominated performances were in The Curious Case of Benjamin Button (2008) and Moneyball (2011). He produced The Departed (2006) and 12 Years a Slave (2013), both of which won the Academy Award for Best Picture, and also The Tree of Life (2011), Moneyball (2011) and The Big Short (2015), all of which were nominated for Best Picture. Pitt is the second actor to have won Academy Awards for both Best Supporting Actor and Best Picture."
  );
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleCallback = () => {
    setShowModal(false);
  };

  return (
    <div className="actorpage_div">
      <p className="subheader inter_bold">Brad Pitt</p>
      <div className="actor_details_div">
        <div className="actor_image_div">
          <img
            src="https://image.tmdb.org/t/p/w200/oAvLuGuTaNcjY3R5huBQdfrZN6j.jpg"
            alt="Image of actor"
            className="actor_image"
          ></img>
        </div>
        <div className="actor_description_div">
          <p className="inter_bold top_margin_text">Biography:</p>
          <p className="biography top_margin_text">
            {biography.length < 1000 ? biography : biography.substring(0, 1750)}{" "}
            ...{" "}
            <span className="links" onClick={() => openModal()}>
              see more.
            </span>
          </p>
          <p className="inter_bold top_margin_text">Known for:</p>
          <p className="top_margin_text">
            Movie 1, movie 2, movie 3 and others...
          </p>
        </div>
      </div>
      {showModal && (
        <ActorBiography
          parentCallback={() => handleCallback()}
          biography={biography}
        ></ActorBiography>
      )}
    </div>
  );
};

export default ActorPage;
