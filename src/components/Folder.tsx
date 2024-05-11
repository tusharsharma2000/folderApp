import { useEffect, useRef, useState } from "react";
import folder from "../assets/folder-solid.svg";
import openFolder from "../assets/folder-open-solid.svg";
import file from "../assets/file-solid.svg";

interface FolderData {
  type: string;
  name: string;
  data: FolderData[];
}

interface ComponentProps {
  files: FolderData[];
  selectFile: boolean;
}

const Folder = ({ files, selectFile }: ComponentProps) => {
  const [showFolder, setShowFolder] = useState<boolean>(false);
  const [showFileOptions, setShowFileOptions] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setShowFileOptions(false);
      }
    };

    if (showFileOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFileOptions]);

  const handleClick = (e) => {
    if (e.target.id === "copy") {
      console.log("COPY");
    }
    if (e.target.id === "delete") {
      console.log("DELETE");
    }
    if (e.target.id === "rename") {
      console.log("RENAME");
    }
    setShowFileOptions(false);
  };

  return (
    files &&
    ((files.type === "folder" && (
      <>
        <div
          className={`folder`}
          // onClick={selectFileHandle}
          onDoubleClick={() => setShowFolder(!showFolder)}
        >
          <span>
            {showFolder ? (
              <img src={openFolder} alt="Folder Icon" className="icon" />
            ) : (
              <img src={folder} alt="Folder Icon" className="icon" />
            )}
          </span>
          <span className="text">{files.name}</span>
        </div>
        {showFolder &&
          files.data &&
          files.data.map((item) => (
            <div className="ml-2">
              <Folder
                files={item}
                selectFile={selectFile}
                // selectFileHandle={selectFileHandle}
              />
            </div>
          ))}
      </>
    )) ||
      (files.type === "file" && (
        <>
          <div
            className="folder"
            onContextMenu={(e) => {
              e.preventDefault();
              setShowFileOptions(!showFileOptions);
            }}
            onClick={() => setShowFileOptions(false)}
          >
            <span>
              <img src={file} alt="Folder Icon" className="icon" />
            </span>
            <span className="text">{files.name}</span>
          </div>
          {showFileOptions && (
            <ul
              className="list-options"
              ref={itemRef}
              onClick={(e) => handleClick(e)}
            >
              <li className="list-item" id="copy">
                Copy
              </li>
              <li className="list-item" id="delete">
                Delete
              </li>
              <li className="list-item b-0" id="rename">
                Rename
              </li>
            </ul>
          )}
        </>
      )))
  );
};

export default Folder;
