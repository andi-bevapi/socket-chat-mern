const users = [];

const addUser = ({id,name,room}) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((el,index) => { return el.room === room && el.name === name });

    if(existingUser){
        return {error: "User is taken"};
    }
    const user = {id,name,room};
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((el) => { return el.id === id });
    console.log("index-----",index);
    
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}


const getUser = (id) => {
    const result = users.find((el,index) => { 
        return el.id == id;
    });
    return result;
}

const getUserInRoom = (room) =>{
    return users.filter((el,index) => { return el.room === room });
}

module.exports = {addUser,removeUser,getUser,getUserInRoom};