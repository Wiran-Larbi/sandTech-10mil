import React, {useState} from "react"


function SideBarElement({value, onClickElement}) {
    const [clickElement, setClickElement] = useState("");

    const handleClick = () => {
        setClickElement(value);
        onClickElement(value);
    }
  
    return (
      <>
        <span className="cursor-pointer text-sm text-blue-700" onClick={handleClick}>{value}</span>
      </>
    )
  }
  
  export default SideBarElement