const express = require("express");
const app = express();
const port = 8080;
const axios = require("axios");
// const freecleverbot = require("cleverbot-free");
// const simsimi = require('simsimi')({
//   key: 'ObCoOeZsgffItWF7nr-euX1VhtW4ve-8R9.61-iS',
// });

app.get("/", function (req, res) {
  res.send("Hello World csdsfss");
});

app.post("/mention", express.json(), async function (req, res) {
  let room_id = req.body.webhook_event.room_id;
  let from_acc = req.body.webhook_event.from_account_id;
  let mss_id = req.body.webhook_event.message_id;
  let a = req.body.webhook_event.body.split("\n");

  // console.log(req.body)
  sender_info = await axios
    .get(`https://api.chatwork.com/v2/rooms/${room_id}/messages/${mss_id}`, {
      headers: {
        "X-ChatWorkToken": "0a5cf1854dc03c7d4363914e6351869f",
      },
    })
    .catch((err) => console.log(err));
  
  sender_info2 = await axios
  .post(
    `https://wsapi.simsimi.com/190410/talk`,
    {
      utext: `${a[1]}`,
      lang: "vi"
  },
    {
      headers: {
        "x-api-key": "yHNt28MJaiA132cn7uGn9ozhKIfRtE3Nh_LtyhAy",
        'Content-Type': 'application/json'
      },
    }
  )
  .catch((err) => console.log(err));

  await axios
    .post(
      encodeURI(`https://api.chatwork.com/v2/rooms/${room_id}/messages?body=[rp aid=${from_acc} to=${room_id}-${mss_id}]${sender_info.data.account.name}\n${sender_info2.data.atext}`),
      {},
      {
        headers: {
          "X-ChatWorkToken": "0a5cf1854dc03c7d4363914e6351869f",
        },
      }
    )
    .catch((err) => console.log(err));
});

app.listen(port, function () {
  console.log("Your app running on port " + port);
});
