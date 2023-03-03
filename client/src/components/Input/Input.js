import "./Input.css";

const Input = ({ message, handleChange, handleKey, sendMessage}) => {
  return (
    <>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <button className="sendButton" onClick={(e)=>{ return sendMessage(e)}}>Send</button>
      </form>
    </>
  );
};

export default Input;
