
const Room = require("./room");

module.exports = (io) => {
  const room = new Room();

  io.on("connection", async (socket) => {
    const roomID = await room.joinRoom();
    socket.join(roomID);

    socket.on("send-message", (message) => {
      socket.to(roomID).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      room.leaveRoom(roomID);
    });
  });
};