import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";

function App() {
  const URL = "https://run.mocky.io/v3/d9c4f3d2-adf3-42aa-9664-1fde3e0ae151";

  const [data, setData] = useState();
  const [selectFile, setSelectFile] = useState<boolean>(false);

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

  const selectFileHandle = () => {
    setSelectFile(!selectFile);
  };

  return (
    <div>
      <Folder
        files={data}
        selectFile={selectFile}
        // selectFileHandle={selectFileHandle}
      />
    </div>
  );
}

export default App;
