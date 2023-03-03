import { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [data, setData] = useState({name:"",room:""});

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    setData((prev) => {
        return {...prev , [name] : event.target.value};
    });
  }

  const handleClick = (event) =>{
     if(!data.name || !data.room){
        return event.preventDefault();
     }
     return null;
  }


  return (
    <div className="joinOuterContaienr">
      <div className="joinInnerContaienr">
        <h1 className="heading">Join</h1>
        <input type="text" placeholder="Name" name="name" value={data.name} className="joinInput" onChange={handleChange}/>
        <input type="text" placeholder="Room" name="room" value={data.room} className="joinInput" onChange={handleChange}/>

        <Link onClick={handleClick} to={`/chat?name=${data.name}&room=${data.room}`}>
            <button className="button mt-20">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
