const send = (status, message, type) => ({
  status,
  time: `[${new Date().toLocaleTimeString("en-US")}]`,
  message,
  type,
});

export default send;