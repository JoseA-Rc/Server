const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "TEST-7611329502095167-071200-b8df03b69ccf0a132cad87317a3a816a-1420954617",
});

app.get("/", function(req, res) {
  res.send("Servidor de Mercado Pago funcionando")
})

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        unit_price: Number(req.body.total),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.json({
      id: response.body.id,
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});