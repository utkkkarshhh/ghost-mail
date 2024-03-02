const validateMessageForm = (username, message) => {
  if (!username) {
    return "Username is required";
  }

  if (!message) {
    return "Message field cannot be empty";
  }

  if (message.length <= 10) {
    return "Message must be atleast 10 characters";
  }

  if (message.toLowerCase().includes("hello")) {
    return "Message cannot contain the word 'hello'";
  }

  return null;
};

export { validateMessageForm };
