import { useState } from "react";
import Episodes from "./Episodes";
function Feed() {
    const [url,setUrl] = useState("");
    const [feed, setFeed] = useState(null);
    const [error, setError] = useState(null);
    const [ load,setLoad ] = useState(false)
    const handleInput = (e) => {
        setUrl(e.target.value);
    }
    const fetchFeed = async ()=>{
        setLoad(true);
        try{
            const response = await fetch(`/feed?url=${encodeURIComponent(url)}`);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setFeed(data);
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
            <button onClick={fetchFeed}>Fetch Episodes</button>
            {error? "Error fetching episodes"+error:<p></p> }
            {feed ? <Episodes feed={feed} />: load ? <p>Loading...</p>:<p></p>}
        </div>
    );
}
export default Feed;