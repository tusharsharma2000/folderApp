import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";

function App() {
  const URL = "https://run.mocky.io/v3/d9c4f3d2-adf3-42aa-9664-1fde3e0ae151";

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return <div>{data ? <Folder files={data} /> : "error"}</div>;
}

export default App;
