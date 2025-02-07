const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Expecta o token no cabeçalho Authorization
  
  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.usuario = decoded; // Armazena as informações do usuário no request
    next(); // Prossegue para a próxima função ou rota
  } catch (err) {
    res.status(400).json({ error: "Token inválido" });
  }
};

module.exports = autenticar;
