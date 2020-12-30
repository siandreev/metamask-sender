import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());

const to = "0x2f318C334780961FB129D2a6c30D0763d9a5C970";
const value = "0x1000";

app.get("/api", (req, res) => {
   res.send(JSON.stringify({to, value}));
});

app.listen('8080', () => {
   console.log("Server started on 8080 port.")
});