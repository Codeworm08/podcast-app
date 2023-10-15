import { useState, useEffect } from "react";
import Episodes from "./Episodes";
import Recent from "./Recent";
function Feed() {
    const [url,setUrl] = useState("");
    const [feed, setFeed] = useState(null);
    const [error, setError] = useState(null);
    const [ load,setLoad ] = useState(false)
    const [recent, setRecent] = useState({});
    useEffect(()=>{
        const recs = JSON.parse(localStorage.getItem('Recent')) || {};
        const rec = Object.entries(recs).map(([title,url])=>({ title,url }) );
        setRecent(rec);
    },[]);
    const handleInput = (e) => {
        setUrl(e.target.value);
    }
    const fetchFeed = async (feedUrl)=>{
        console.log(url);
        setLoad(true);
        try{
            const response = await fetch(`/feed?url=${encodeURIComponent(feedUrl)}`);
            if(response.ok){
                const data = await response.json();
                const recentFeeds = JSON.parse(localStorage.getItem('Recent')) || {};
                recentFeeds[data.title]=feedUrl;
                const feedKeys = Object.keys(recentFeeds);
                if(feedKeys.length>10){
                    const oldest = feedKeys[0];
                    delete recentFeeds[oldest];
                }
                localStorage.setItem('Recent',JSON.stringify(recentFeeds));
                setFeed(data);
                const rec = Object.entries(recentFeeds).map(([title, url]) => ({ title, url }));
                setRecent(rec);
            }
            else{
                const er="Failed to fetch data: "+response.statusText;
                console.log("Failed to fetch data: ",response.statusText);
                setError(er);
            }
        } catch(error){
            console.log("Error: ",error);
            setError(error);
        }
        finally{
            setLoad(false);
        }
    }
    return (
        <div className="URL">
            <input type="text" placeholder="Enter RSS Feed Link" onChange={handleInput} />
            <button onClick={()=>fetchFeed(url)}>Fetch Episodes</button>
            {error? "Error fetching episodes"+error:<p></p> }
            {Object.keys(recent).length>0 ? <Recent list={recent} setUrl={setUrl} fetchFeed={fetchFeed}/>:<p></p>}
            {feed ? <Episodes feed={feed}  />: load ? <p>Loading...</p>:<p></p>}
        </div>
    );
}
export default Feed;