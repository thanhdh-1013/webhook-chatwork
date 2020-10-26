const express = require("express");
const app = express();
const port = 8080;
const axios = require("axios");

app.get("/", function (req, res) {
  res.send("Hello World csdsfss");
});

app.post("/mention", express.json(), function (req, res) {
  let room_id = req.body.webhook_event.room_id;
  let from_acc = req.body.webhook_event.from_account_id;
  let mss_id = req.body.webhook_event.message_id;

  console.log(req.body);
  console.log(room_id);
  axios
    .post(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages?body=[rp aid=${from_acc} to=${room_id}-${mss_id}] Huyt\nHhaha`,
      {},
      {
        headers: {
          "X-ChatWorkToken": "6056e21e8d7abbd0b12589dca1c5d466",
        },
      }
    )
    .catch((err) => console.log(err));
});

app.listen(port, function () {
  console.log("Your app running on port " + port);
});
