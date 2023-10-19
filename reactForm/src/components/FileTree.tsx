import { MouseEventHandler, useRef, useState } from "react";

type Folder = {
  childFolders: Folder[];
  childFiles: File[];
  name: string;
  expanded: boolean;
};

type File = {
  name: string;
};

const testFolder: Folder = {
  childFiles: [{ name: "Sec Fil" }, { name: "TwoGnaw" }],
  childFolders: [],
  name: "Test Folder",
  expanded: false,
};

const root: Folder = {
  childFiles: [{ name: "Test" }, { name: "Tunoa" }],
  childFolders: [testFolder],
  name: "Root",
  expanded: false,
};

export const FileTree = () => {
  return (
    <>
      <h2>File Tree</h2>
      <div className="file-tree">
        <FolderComponent folder={root}></FolderComponent>
      </div>
    </>
  );
};

const FolderComponent = ({ folder: initialFolder }: { folder: Folder }) => {
  const [folder, setFolder] = useState<Folder>(initialFolder);
  const [createNewFile, setCreateNewFile] = useState<boolean>(false);
  const [createNewFolder, setCreateNewFolder] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");

  const fileNameInputRef = useRef<HTMLInputElement | null>(null);
  const folderNameInputRef = useRef<HTMLInputElement | null>(null);

  const onFolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setFolder({ ...folder, expanded: !folder.expanded });
  };

  const handleAddFile: MouseEventHandler<HTMLButtonElement> = (): void => {
    setCreateNewFile(true);
    setFolder({ ...folder, expanded: true });
    //TIL: The input wasn't rendered yet, as the state above only renders on the next rerender.
    //This meant that I couldn't call focus on this re-render.
    //Using this setTimeout approach fixed this. Adding the focus to the next eventLoop after the re-render of the
    //input is done.
    setTimeout(() => {
        fileNameInputRef.current?.focus();
      }, 0);
  };

  const handleAddFolder: MouseEventHandler<HTMLButtonElement> = (): void => {
    setCreateNewFolder(true);
    setFolder({ ...folder, expanded: true });
    setTimeout(() => {
      folderNameInputRef.current?.focus();
    }, 0);
  };

  const handleNewFolder = () => {
    const newFolder: Folder = {
      childFiles: [],
      childFolders: [],
      name: newFolderName,
      expanded: false,
    };
    setFolder({ ...folder, childFolders: [...folder.childFolders, newFolder] });
    setCreateNewFolder(false);
    setNewFolderName("");
  };

  const handleNewFile = () => {
    const newFile: File = {
      name: newFileName,
    };
    setFolder({ ...folder, childFiles: [...folder.childFiles, newFile] });
    setCreateNewFile(false);
    setNewFileName("");
  };

  return (
    <div className="folder">
      <div className="folder-header">
        <h3 onClick={onFolderClick}>{folder.name}</h3>
        <div className="buttons-container">
          <button
            className="add-button"
            disabled={createNewFile}
            onClick={handleAddFile}
            type="button"
          >
            Add File
          </button>
          <button
            className="add-button"
            onClick={handleAddFolder}
            disabled={createNewFolder}
            type="button"
          >
            Add Folder
          </button>
        </div>
      </div>

      {folder.expanded ? (
        <>
          {folder.childFolders.map((folder) => (
            <FolderComponent folder={folder}></FolderComponent>
          ))}
          <div className="files">
            {folder.childFiles.map((file) => (
              <p>{file.name}.txt</p>
            ))}
          </div>

          {createNewFile && (
            <div className="folder-header">
              <input
                placeholder="File Name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewFile()}
                ref={fileNameInputRef}
              ></input>
              <div className="buttons-container">
                <button type="button" onClick={handleNewFile}>
                  Add
                </button>
                <button type="button" onClick={() => setCreateNewFile(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          {createNewFolder && (
            <div className="folder-header">
              <input
                placeholder="Folder Name"
                value={newFolderName}
                onChange={(value) => setNewFolderName(value.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewFolder()}
                ref={folderNameInputRef}
              ></input>
              <div className="buttons-container">
                <button type="button" onClick={handleNewFolder}>
                  Add
                </button>
                <button type="button" onClick={() => setCreateNewFolder(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};
