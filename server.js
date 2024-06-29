const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDataBase = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDataBase();

const libro = require("./rutas/libro");

const autor = require("./rutas/autor");

const usuario = require("./rutas/usuario");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/libreriaAutor", autor);
app.use("/api/libro", libro);
app.use("/api/usuario", usuario)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log("servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Errores", err.message);
  server.close(() => process.exit(1));
});
