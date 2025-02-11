require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const listarUser = require("./routes/listarUser");
const tagRouter = require("./routes/tags");
const app = express();
const fs = require("fs");
const path = require("path");
const populateDatabase = require("./config/populateDB"); // Script para popular o DB


const sanitizer = require("perfect-express-sanitizer"); // Previnir ataques xss
const rateLimit = require("express-rate-limit"); // Limita o número de requisições
const morgan = require("morgan");   // Registra todas as requisições no console
const winston = require("winston");
const expressWinston = require("express-winston");


// Definindo o limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 requisições por IP
  message: "Muitas requisições, tente novamente mais tarde."
});
// Criar a pasta "log" se não existir 
const logDirectory = path.join(__dirname, "log");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Configurações
app.use(express.json());
app.use(cors());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
); // Sanitizer
app.use(limiter);
app.use(morgan("combined"));

// Logger para registrar todas as requisições recebidas
app.use(expressWinston.logger({
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: path.join(logDirectory, "requests.log") }) // Salva em "log/requests.log"
  ],
  format: winston.format.json(),
  meta: true,
  expressFormat: true
}));

// Logger para capturar erros e salvar no arquivo de logs
app.use(expressWinston.errorLogger({
  transports: [
      new winston.transports.File({ filename: path.join(logDirectory, "errors.log") }) // Salva em "log/errors.log"
  ],
  format: winston.format.json()
}));

// Conectar ao MongoDB
const mongoURL = process.env.MONGO_URL;
console.log("\n\n\nMongourl-=-==-=: \n" +process.env.MONGO_URL)
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));


mongoose.connection.once("open", async () => {
  console.log("📌 Verificando e populando banco de dados...");
  await populateDatabase();
});

  
/**Rotas para cadastro login e listar usuarios */
//rota para login e cadastro
app.use("/auth", authRouter);
//rota para listar os usuários
app.use("/listarUser",listarUser);
//rota para as tags
app.use("/", tagRouter);


// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});