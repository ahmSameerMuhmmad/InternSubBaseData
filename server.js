const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 5500; // Choose any available port number

app.use(express.json());

app.post("/authenticate", async (req, res) => {
  try {
    const response = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: req.body.email,
        password: req.body.password,
      }),
    });
    if (!response.ok) {
      throw new Error("Invalid Authorization");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ error: "Invalid Authorization" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
