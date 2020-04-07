const express = require("express");
const cors = require("cors");
const userRouter = require("./user/router");
const partyRouter = require("./party/router");

const app = express();
const port = process.env.ENV || 4000;
const corsMiddleware = cors();
const jsonMiddleware = express.json();

app.use(corsMiddleware);
app.use(jsonMiddleware);
app.use(userRouter);
app.use(partyRouter);

app.listen(port, () => `Listening on port ${port}`);
