import { useState, useEffect } from "react";
function Episodes(props) {

    useEffect(() => {
        console.log("Props: ",props.feed);
    }, [props.feed]);
    return (
        <div className="Episodes">
        {props.feed && props.feed.items.map((episode, index) => (
            <div key={index}>
              <h2>{episode.title}</h2>
              <div>
                <p>Published Date: {episode.pubDate}</p>
              </div>
              <div>
                <p>{episode.title}</p>
                <audio controls>
                  <source src={episode.enclosure.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>
      );
}
export default Episodes;