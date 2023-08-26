document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  const colors = ["#007bff", "#e83e8c", "#28a745", "#fd7e14", "#17a2b8"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const username = "User" + Math.floor(Math.random() * 1000);

  sendButton.addEventListener("click", function() {
    sendMessage();
  });

  messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  });

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
      const messageElement = document.createElement("div");
      messageElement.className = "message";
      messageElement.style.color = randomColor;
      messageElement.textContent = `${username}: ${message}`;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
      messageInput.value = "";
    }
  }
});
