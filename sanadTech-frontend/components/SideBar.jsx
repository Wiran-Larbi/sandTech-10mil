import SideBarElement from "./SideBarElement"
import React, {useState} from "react";

function SideBar({onClickElement}) {
    const [clickedElement, setClickedElement] = useState('');

    const handleClickElement = (data) => {

        setClickedElement(data);
        onClickElement(data);
    }
  
    return (
      <>
        <div className="
        flex flex-col gap-0 fixed top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 z-10 -m-4
        ">
          <SideBarElement value="A" onClickElement={handleClickElement} />
          <SideBarElement value="B" onClickElement={handleClickElement} />
          <SideBarElement value="C" onClickElement={handleClickElement} />
          <SideBarElement value="D" onClickElement={handleClickElement} />
          <SideBarElement value="E" onClickElement={handleClickElement} />
          <SideBarElement value="F" onClickElement={handleClickElement} />
          <SideBarElement value="G" onClickElement={handleClickElement} />
          <SideBarElement value="H" onClickElement={handleClickElement} />
          <SideBarElement value="I" onClickElement={handleClickElement} />
          <SideBarElement value="J" onClickElement={handleClickElement} />
          <SideBarElement value="K" onClickElement={handleClickElement} />
          <SideBarElement value="L" onClickElement={handleClickElement} />
          <SideBarElement value="M" onClickElement={handleClickElement} />
          <SideBarElement value="N" onClickElement={handleClickElement} />
          <SideBarElement value="O" onClickElement={handleClickElement} />
          <SideBarElement value="P" onClickElement={handleClickElement} />
          <SideBarElement value="Q" onClickElement={handleClickElement} />
          <SideBarElement value="R" onClickElement={handleClickElement} />
          <SideBarElement value="S" onClickElement={handleClickElement} />
          <SideBarElement value="T" onClickElement={handleClickElement} />
          <SideBarElement value="U" onClickElement={handleClickElement} />
          <SideBarElement value="V" onClickElement={handleClickElement} />
          <SideBarElement value="W" onClickElement={handleClickElement} />
          <SideBarElement value="X" onClickElement={handleClickElement} />
          <SideBarElement value="Y" onClickElement={handleClickElement} />
          <SideBarElement value="Z" onClickElement={handleClickElement} />
        </div>
        
      </>
    )
  }
  
  export default SideBar