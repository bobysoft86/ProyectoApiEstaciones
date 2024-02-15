const socket = io(); // Esta es la conexión al servidor Socket.IO

// Elimina esta sección, ya que el evento 'connection' se maneja en el servidor, no en el cliente
// socket.on("connection", (socket) => {
//   console.log(socket.id);
// });

socket.on("receive-message", (message) => {
  createMessage(message);
});

sendButton.addEventListener("click", () => {
  if (textBox.value.trim() !== "") { // Verifica si el mensaje no está vacío
    socket.emit("send-message", textBox.value);
    createMessage(textBox.value, true);
    textBox.value = "";
  }
});

function createMessage(text, ownMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  const subMessageElement = document.createElement("div");
  subMessageElement.className =
    "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
  if (ownMessage) {
    subMessageElement.className += " float-right bg-blue-800 text-white";
  }
  subMessageElement.innerText = text;
  messageElement.appendChild(subMessageElement);

  messageBox.appendChild(messageElement);
}