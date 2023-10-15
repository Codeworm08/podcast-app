import { useState, useEffect, useRef } from "react";
import "../audio.css";
import "../episodes.css";
function AudioPlayer({ enclosureUrl, currentTitle }) {
  const audioRef = useRef(null);

  useEffect(() => {
    console.log(enclosureUrl);
    if (audioRef.current) {
      audioRef.current.src = enclosureUrl;
      audioRef.current.load();
    }
  }, [enclosureUrl]);

  return (
    <div className="Player">
      <div className="current-title">{currentTitle}</div>
      <audio ref={audioRef} controls>
      <source src={enclosureUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

function Episodes(props) {
    const audioRef = useRef(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const handleEpisodeClick = (episode) => {
      setSelectedEpisode(episode);
    };
    useEffect(() => {
        console.log("Props: ",props.feed);
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reset the current time to the beginning
          audioRef.current.load(); // Load the audio
      }
    }, [props.feed]);
    return (
        <div className="Episodes">
        <div className="episode-titles">
        <h1>{props.feed.title}</h1>
        {props.feed && props.feed.items.map((episode, index) => (
            <div key={index}>
              <h2 className="episode" onClick={() => handleEpisodeClick(episode)}>{episode.title}</h2>
              <div>
                <p>Published Date: {episode.pubDate}</p>
              </div>
            </div>
          ))}
          </div>
          {selectedEpisode && <AudioPlayer enclosureUrl={selectedEpisode.enclosure.url} currentTitle={selectedEpisode.title} />}
        </div>
      );
}
export default Episodes;