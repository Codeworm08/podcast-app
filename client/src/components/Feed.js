import { useState } from "react";
function Feed() {
    const {url,setUrl} = useState("");
    const {feed, setFeed} = useState(null);
    const handleInput = (e) => {
        setUrl(e.target.value);
    }
    const fetchFeed = ()=>{
        const apiUrl = `/feed?url=${encodeURIComponent(url)}`;
        fetch(apiUrl)
        .then()
    }
    return (
        <div className="URL">
            <input type="text" placeholder="Enter RSS Feed Link" onChange={handleInput} />
            <button onClick={fetchFeed}>Fetch Episodes</button>
            {feed ? <Episodes feed={feed} />: <p>Loading...</p>}
        </div>
    );
}
export default Feed;