import { useState, useEffect } from "react";
function Episodes(props) {

    useEffect(() => {
        console.log("Props: ",props.feed);
    }, [props.feed]);
    return (
        <div className="Episodes">
        {props.feed && props.feed.map((episode, index) => (
            <div key={index}>
              <h2>{`Episode ${index + 1}:`}</h2>
              <div>
                <p>Title: {episode.title}</p>
                <p>Link: {episode.link}</p>
              </div>
              <div>
                <p>Description: {episode.description}</p>
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