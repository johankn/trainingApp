import React, { useState } from "react";

function ChooseCommunityCarousel({ communities, setUserCommunity }) {
  return (
    <div className="choose-program-container">
      {communities
        .map((community) => (
          <div
            className="choose-program-card"
            onClick={() => setUserCommunity(community)}
          >
            <div>
              <h2 className="choose-program-title">{community.community.name}</h2>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChooseCommunityCarousel;
