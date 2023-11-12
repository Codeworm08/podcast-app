import "../recent.css";
function Recent(props) {
    const handleClick = (url) =>{
        console.log("Clicked URL:", url);
        props.fetchFeed(url);
    }
    return (
        <div className="recent">
            <h3>Recent</h3>
            <ul>
                {props.list.map((feed,i) => (
                    <li className="past"key={i}>
                        <button onClick={()=>handleClick(feed.url)}>{feed.title}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Recent;