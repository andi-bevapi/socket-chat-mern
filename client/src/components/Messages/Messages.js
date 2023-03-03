import "./Messages.css";
import Message from "../Message/Message";

import ScrollToBottome from "react-scroll-to-bottom"

const Messages = ({messages,name}) => {
  return (
    <>
      <ScrollToBottome className="messages">
        {
            messages.map((el,index)=>{
                return(
                    <div key={index}>
                        <Message message={el} name={name}/>
                    </div>
                )
            })
        }
      </ScrollToBottome>
    </>
  );
};

export default Messages;
