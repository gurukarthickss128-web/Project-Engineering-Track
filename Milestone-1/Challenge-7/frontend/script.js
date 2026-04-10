// Conversation memory
const messages = [];

// DOM elements
const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Render message
function renderMessage(role, content) {
    const msg = document.createElement('div');
    msg.classList.add('message', role);
    msg.textContent = content;

    chatDisplay.appendChild(msg);

    // auto scroll
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Send message
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // show user message
    renderMessage("user", text);

    // store user message
    messages.push({
        role: "user",
        content: text
    });

    messageInput.value = "";

    try {
        const res = await fetch("https://project-engineering-track-plpn.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages })
        });

        const data = await res.json();

        const reply = data.reply;

        // store AI message
        messages.push({
            role: "assistant",
            content: reply
        });

        // show AI message
        renderMessage("assistant", reply);

    } catch (err) {
        console.error(err);
        renderMessage("assistant", "Error: Server not responding");
    }
}

// button click
sendBtn.addEventListener("click", sendMessage);

// Enter key support
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
