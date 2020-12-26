import React from "react";
import { loremIpsum, LoremIpsum } from "lorem-ipsum";
import "./Authors.css";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
function Authors() {
  return (
    <div className="Authors-container">
      <figure class="snip1336">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
          alt="sample87"
        />
        <figcaption>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg"
            alt="profile-sample4"
            class="profile"
          />
          <h2>
            Iraklis Chatzinikolaou<span>Physics Msc.</span>
          </h2>
          <p> {lorem.generateWords(100)}</p>
          <h3>Key skills include:</h3>
          <ul>
            <li>{lorem.generateWords(6)}</li>
            <li>{lorem.generateWords(6)}</li>
            <li>{lorem.generateWords(6)}</li>
          </ul>
          <h4>Professional Experience</h4>
          <ol>
            <li>{lorem.generateWords(10)}</li>
            <li>{lorem.generateWords(16)}</li>
          </ol>
          <a href="#" class="follow">
            Follow
          </a>
          <a href="#" class="info">
            More Info
          </a>
        </figcaption>
      </figure>
      <figure class="snip1336">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
          alt="sample87"
        />
        <figcaption>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg"
            alt="profile-sample4"
            class="profile"
          />
          <h2>
            Christos Fylachtos<span>Computer Engineer Undergrad</span>
          </h2>
          <p>{lorem.generateWords(100)}</p>
          <h3>Key skills include:</h3>
          <ul>
            <li>{lorem.generateWords(6)}</li>
            <li>{lorem.generateWords(6)}</li>
            <li>{lorem.generateWords(6)}</li>
          </ul>
          <h4>Professional Experience</h4>
          <ol>
            <li>{lorem.generateWords(10)}</li>
            <li>{lorem.generateWords(12)}</li>
          </ol>
          <a href="#" class="follow">
            Follow
          </a>
          <a href="#" class="info">
            More Info
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

export default Authors;
