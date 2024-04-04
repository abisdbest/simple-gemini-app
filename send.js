let conversation = [];

form = document.getElementById('form')

form.addEventListener('submit', sendMessage());

async function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  const conversationList = document.getElementById('conversation');
  
  try {
    const userMessageItem = document.createElement('li');
    userMessageItem.textContent = `You: ${message}`;
    conversationList.appendChild(userMessageItem);
    
    var complete_send = "This is a dictionary of the previous conversation: " + JSON.stringify(conversation) + "This is the new message the user has just posted. You are only to reply to this new messages and may only refer to the previous conversation. A message the user asks you could refer to a previous message sent by the user or an answer sent by ai so make sure to refer back. Here is the message: '" + message + "'";

    const response = await fetch('https://gemini-server-vu25.onrender.com/sendMessage#classroom.google.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: complete_send })
    });
    
    const responseData = await response.json();
    
    const aiResponseItem = document.createElement('li');
    aiResponseItem.textContent = `AI: ${responseData.response}`;
    conversationList.appendChild(aiResponseItem);
    
    messageInput.value = '';
    
    conversation.push({ user: message, ai: responseData.response });
  } catch (error) {
    console.error('Error:', error);
    conversationList.innerHTML += '<li>An error occurred. Please try again later.</li>';
  }
}

function populateConversation() {
  const conversationList = document.getElementById('conversation');
  conversation.forEach(item => {
    const userMessageItem = document.createElement('div');
    userMessageItem.textContent = `You: ${item.user}`;
    conversationList.appendChild(userMessageItem);
    userMessageItem.classList.add("usermsg");

    const aiResponseItem = document.createElement('li');
    aiResponseItem.textContent = `AI: ${item.ai}`;
    conversationList.appendChild(aiResponseItem);
    aiResponseItem.classList.add("aimsg");
  });
}

populateConversation();