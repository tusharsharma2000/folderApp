import { useEffect, useRef, useState } from "react";
import folder from "../assets/folder-solid.svg";
import openFolder from "../assets/folder-open-solid.svg";
import file from "../assets/file-solid.svg";

interface FileData {
  type: string;
  name: string;
  meta?: string;
}

interface FolderData {
  type: string;
  name: string;
  data: (FileData | FolderData)[];
}

interface Props {
  files: FolderData;
}

const Folder = ({ files }: Props) => {
  const [showFolder, setShowFolder] = useState<boolean>(false);
  const [showFileOptions, setShowFileOptions] = useState<boolean>(false);
  const itemRef = useRef<HTMLUListElement>(null);

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

  const handleClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const targetId = (e.target as HTMLElement).id;
    if (targetId === "copy") {
      console.log("COPY");
    } else if (targetId === "delete") {
      console.log("DELETE");
    } else if (targetId === "rename") {
      console.log("RENAME");
    }
    setShowFileOptions(false);
  };

  return (
    <>
      {files?.type === "folder" && (
        <>
          <div
            className="folder"
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
          {files.data &&
            showFolder &&
            files.data.map((item, index) => (
              <div className="ml-2" key={index}>
                <Folder files={item as FolderData} />
              </div>
            ))}
        </>
      )}
      {files?.type === "file" && (
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
      )}
    </>
  );
};

export default Folder;
