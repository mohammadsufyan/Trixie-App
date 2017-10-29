
class ChatService {

  processMessage(message) {
    console.log(message.body);
  }

  
}

module.exports = new ChatService();
