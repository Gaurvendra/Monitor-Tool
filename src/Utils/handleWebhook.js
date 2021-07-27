const webHookStart = (webhook, user = "", data = "", time = "") => {
  var request = new XMLHttpRequest();
  if (webhook && user === "") {
    //means we are just testing it from the settings section
    request.open("POST", webhook);
    request.setRequestHeader("Content-type", "application/json");
    let testParams = {
      content: "",
      embeds: [
        {
          title: "Testing Webhook :thinking:",
          color: 7844437,
          timestamp: time ? time : new Date(),
          footer: {
            text: "Crystyl TOOLS",
            icon_url:
              "https://media.discordapp.net/attachments/703413973546041444/807246418179391538/ezgif-3-93b2d3f4fb4c.png",
          },
        },
      ],
    };
    request.send(JSON.stringify(testParams));
    return;
  }

  request.open("POST", webhook);

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    username: user,
    avatar_url: "",
    content: null, //'Ready at',
    embeds: [
      {
        title: `${user} is logged in!  :partying_face:`,
        color: 7844437,
        timestamp: time ? time : new Date(),
        footer: {
          text: "Crystyl TOOLS",
          icon_url:
            "https://media.discordapp.net/attachments/703413973546041444/807246418179391538/ezgif-3-93b2d3f4fb4c.png",
        },
      },
    ],
  };

  request.send(JSON.stringify(params));
};

export default function handleWebhook(
  webhook,
  user = "",
  data = "",
  safeMode,
  delay =300
) {

  console.log('safeMode = ',safeMode);
  if (safeMode) {
    console.log("delay = ",delay);
    setTimeout(() => {
      webHookStart(webhook, user, data);
    }, delay);
  } else webHookStart(webhook, user, data);
}
