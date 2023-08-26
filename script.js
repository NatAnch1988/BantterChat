document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Scaledrone channel ID
  const channelID = 'fDFO6KFGLXFBD0jS';
  
  // Generate random usernames for Nate and Ani
  const nateUsername = "Nate";
  const aniUsername = "Ani";

  // Connect to Scaledrone
  const drone = new Scaledrone(channelID);

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Connected to Scaledrone');
  });

  const room = drone.subscribe('chat-room');

  sendButton.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message !== "") {
      drone.publish({
        room: 'chat-room',
        message,
        username: nateUsername // Always use Nate's username
      });
      messageInput.value = "";
    }
  });

  drone.on('message', message => {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    
    // Determine the appropriate username
    const senderUsername = message.member.clientData.username === nateUsername ? nateUsername : aniUsername;
    
    messageElement.textContent = `${senderUsername}: ${message.data}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  messageInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendButton.click();
      event.preventDefault();
    }
  });
});
