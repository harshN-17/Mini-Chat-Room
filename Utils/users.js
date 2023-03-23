const users = [];

function joinUser(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user;
}

function removeUser(id, username, room) {
    users = newUsers;
    const newUsers = users.map(user => user.id !== id);
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function getUser(id) {
    return users.filter(user => user.id === id)[0];
}

module.exports = {
    joinUser, 
    getUser,
    removeUser,
    getRoomUsers,
};