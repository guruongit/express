import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "gurvi";
const yourPassword = "gurvi";
const yourAPIKey = "b54e676d-f3c3-4166-86d9-abfe3c147606";
const yourBearerToken = "6986b9f0-dec6-4c6f-aa0c-f99d4e98e5f4";

app.get("/", (req, res) => {
  res.render("index.ejs", { data: "API Response." });
});

let link;
app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  link = API_URL + "random"
  try {
    const result = await axios.get(link);
    res.render("index.ejs", { data: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
  
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

    link = API_URL + "all?page=1"
  try {
    const result = await axios.get(link,{
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    //const result = response.data;
    //console.log(result[Math.random() * array.length | 0]);
    res.render("index.ejs", { data: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  link = API_URL + "filter?score=5&apiKey=" + yourAPIKey;
  try {
    const result = await axios.get(link);
    //const result = response.data;
    //console.log(result[Math.random() * array.length | 0]);
    res.render("index.ejs", { data: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  link = API_URL + "secrets/2"
  try {
    const result = await axios.get(link,{
      headers: {
        Authorization: `Bearer <${yourBearerToken}>` 
      }
    });
    //const result = response.data;
    //console.log(result[Math.random() * array.length | 0]);
    res.render("index.ejs", { data: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
