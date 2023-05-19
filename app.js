const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "8eb27e94ce0507a016ef243a5f681068";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const imageIcon = weatherData.weather[0].icon;
      const imageURL =
        "https://openweathermap.org/img/wn/" + imageIcon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degree celcius</h1>"
      );
      res.write("the weather is currently " + weatherDescription);
      res.write("<img src= " + imageURL + " >");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("welcome to localhost 3000");
});
