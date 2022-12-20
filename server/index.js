const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "5aa70d2edc6b5d0e4310f6fd221f5c70dc6cf447": 100, //Arda
  "d84d8bf8e67e152218359b38e53c346434d281db": 50, //Alice
  "5656b0a87d42b7d8e7d2a19ef8c15367f0b3e350": 75, //Bob
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { message, signature, recipient, amount, recoveryBit } = req.body;

  const sender = await utils.recoverAddress(message, signature, recoveryBit)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balasendernces[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
