import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="banner">
        <div className="opacity-layer">
          <h1 className="banner-text">About Me</h1>
        </div>
      </div>
      <div className="about-history">
        <img
          className="about-image"
          src="https://images.unsplash.com/photo-1517963140-f60c9eceb504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=701&q=80"
        />
        <div className="about-text">
          <h1>History</h1>
          <h2>
            Camille's Corner started back in the summer of 2019 when Camille
            first moved to NYC for an internship. Sitting behind a screen all
            day in the middle of a giant concrete jungle made her long for the
            proper outdoors. Hopelessly stuck between being drawn to the culture
            of cities and the allure of Mother Nature, Camille decided to bridge
            the two worlds through adventure and discovery, adopting a digital
            nomad life that took her across the country. The name of the blog
            comes from the corner in her room where Camille hung up tapestries
            that depicted beautiful landscapes juxtaposed against her Soho
            apartment. The goal of Camille's Corner is to show others that in
            every city, nature offers an escape, and no one has to choose only
            one world.
          </h2>
        </div>
      </div>
      <hr style={{ width: "150px" }} />
      <div className="about-history">
        <div className="about-text">
          <h1>About Camille</h1>
          <h2>
            Camille is a recent college graduate from UVA currently traveling
            from city to city exploring what urban life offers while taking
            advantage of any opportunity to get back to the great outdoors.
            Educated as a chemical engineer, Camille threw that into the wind to
            pursue software development and adventure. Exclusively working for
            new start-ups as a freelancer, she has been able to have extended
            stays in NYC, Denver, SF, Seattle, and Barcelona. She hopes to go
            next to Austin or London, but, in truth, with her, you never know
            where she'll be next. Known to be spontaneous and indecisive,
            Camille chose this life because it allows her to explore every
            option that life provides. She loves being a digital nomad because
            each new city brings new stories and opportunities. She never
            realized that documenting this way of life would garner such a large
            following for which she is grateful every day. Her goal is to
            promote adventures and positivity. One day she hopes to go to every
            national park.
          </h2>
        </div>
        <img
          className="about-image2"
          src="https://images.unsplash.com/photo-1599792092050-63b1834bb89f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
        />
      </div>
      {/* <div>
        <div>
          <h1>About Camille</h1>
          <h2>
            Camille is a recent college graduate from UVA currently traveling
            from city to city exploring what urban life offers while taking
            advantage of any opportunity to get back to the great outdoors.
            Educated as a chemical engineer, Camille threw that into the wind to
            pursue software development and adventure. Exclusively working for
            new start-ups as a freelancer, she has been able to have extended
            stays in NYC, Denver, SF, Seattle, and Barcelona. She hopes to go
            next to Austin or London, but, in truth, with her, you never know
            where she'll be next. Known to be spontaneous and indecisive,
            Camille chose this life because it allows her to explore every
            option that life provides. She loves being a digital nomad because
            each new city brings new stories and opportunities. She never
            realized that documenting this way of life would garner such a large
            following for which she is grateful every day. Her goal is to
            promote adventures and positivity. One day she hopes to go to every
            national park.
          </h2>
        </div>
        <img src="https://images.unsplash.com/photo-1599792092050-63b1834bb89f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" />
      </div> */}
    </div>
  );
};

export default About;
