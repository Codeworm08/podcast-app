import logo from './logo.svg';
import './App.css';
import React from "react";
import "./App.css";
import Feed from './components/Feed';
function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
    .then((res)=> res.json())
    .then((data)=>setData(data.message));
  }, []);
  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;
