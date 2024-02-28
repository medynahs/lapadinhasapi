import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ari!020402",
  database: "lapadinha",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/clientes", (req, res) => {
  const q = "SELECT * FROM clientes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/clientes", (req, res) => {
  const q =
    "INSERT INTO clientes(`duration`, `date`, `period`, `typeOfPayment`,`discount`, `roomNumber`, `typeOfRoom`, `totalPrice`, `age`, `nationality` ) VALUES (?)";

  const values = [
    req.body.duration,
    req.body.date,
    req.body.period,
    req.body.typeOfPayment,
    req.body.discount,
    req.body.roomNumber,
    req.body.typeOfRoom,
    req.body.totalPrice,
    req.body.age,
    req.body.nationality,
  ];

  console.log(q, [values]);
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/clientes/:id", (req, res) => {
  const clienteId = req.params.id;
  const q = " DELETE FROM clientes WHERE id = ? ";

  db.query(q, [clienteId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/clientes/:id", (req, res) => {
  const clienteId = req.params.id;
  const q =
    "UPDATE clientes SET `duration`= ?, `date`= ?, `period`= ?, `typeOfPayment`= ?, `discount`= ?, `roomNumber`= ?, `typeOfRoom`= ?, `totalPrice`= ?, `age`= ?, `nationality`= ?  WHERE id = ?";

  const values = [
    req.body.duration,
    req.body.date,
    req.body.period,
    req.body.typeOfPayment,
    req.body.discount,
    req.body.roomNumber,
    req.body.typeOfRoom,
    req.body.totalPrice,
    req.body.age,
    req.body.nationality,
  ];

  db.query(q, [...values, clienteId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
