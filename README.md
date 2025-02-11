# 📖 Aplicação Bíblia - Documentação

## 📌 Visão Geral
Esta aplicação tem como objetivo permitir a busca, visualização e marcação de passagens da Bíblia. Os usuários podem pesquisar por termos, visualizar capítulos e versículos, bem como adicionar tags às passagens para facilitar a navegação.

---

## 🏗️ Tecnologias Utilizadas

### Front-end (React + Redux)
- **React**: Biblioteca principal para construção da interface.
- **Redux Toolkit**: Gerenciamento de estado global.
- **Material-UI**: Componentes estilizados e responsivos.
- **JavaScript**: Linguagem de programação base.
- **JSON**: Estrutura de dados local para navegação offline.
- **CSS**: Estilos personalizados para a aplicação.
- **[Bible API](https://bible-api.com/)**: API para busca de versículos bíblicos.

### Back-end (Express.js + MongoDB)
- **Express.js**: Framework para criação da API REST.
- **MongoDB Atlas**: Banco de dados NoSQL para armazenar usuários, versículos e tags.
- **Mongoose**: ODM para manipulação do banco de dados.
- **JSONWebToken (JWT)**: Autenticação de usuários.
- **Bcrypt**: Criptografia de senhas.
- **Perfect Express Sanitizer**: Previnir ataques XSS (Cross-Site-Scripting) e injeção de código malicioso.
- **Express Rate Limit**: Proteção contra ataques de força bruta e DDoS
- **Winston**: Criação de logs para monitoramento.

### API Externa
- A aplicação utiliza uma **API externa** para buscar o conteúdo dos versículos com base em um termo de pesquisa.

---

## 📂 Estrutura do Projeto

### 📌 Front-end
```
/src
  ├── components/     # Componentes reutilizáveis
  ├── pages/          # Páginas principais
  ├── data/           # Dados da Bíblia
  ├── slices/         # Slices para o estado global da aplicação
  ├── services/       # Funções auxiliares
  ├── app.js          # Componente principal
  ├── index.js        # Ponto de entrada
```

### 📌 Back-end
```
/server
  ├── models/         # Modelos do banco de dados (Mongoose)
  ├── routes/         # Rotas da API
  ├── helpers/        # Middlewares (ex: autenticação JWT)
  ├── server.js       # Arquivo principal do servidor
```

---

## 🚀 Funcionalidades

- 📚 **Navegação por Livros, Capítulos e Versículos**: Explore os livros do Antigo e Novo Testamento, selecione capítulos e visualize os versículos diretamente.
- 🔍 **Busca Personalizada**: Pesquise versículos específicos inserindo o capítulo e número do versículo.
- 🎲 **Versículo Aleatório**: Gere aleatoriamente uma mensagem para reflexão diária.
- 🎨 **Interface Responsiva**: Layout moderno e responsivo, desenvolvido com Material-UI.
- ⚡ **Integração com API**: Requisições dinâmicas utilizando a [Bible API](https://bible-api.com/).
- 🏷️ **Inserção e Busca de Tags**: Facilitam o usuário na busca de versículos por temas.

---

## 🔑 Autenticação
- Usuários precisam se registrar e fazer login para acessar certas funcionalidades.
- As senhas são criptografadas usando **bcrypt**.
- O acesso é protegido por **JWT**, garantindo segurança nas requisições.

---

## 🔍 Busca e Exibição de Versículos
- O **JSON da Bíblia** contém os livros, capítulos e versículos.
- A estrutura inclui uma chave abreviada para cada livro (ex: `GEN` para Gênesis).
- Os usuários podem buscar versículos por palavras-chave usando a **API externa**.
- A exibição dos livros no Accordion usa o campo `name`, mas a busca utiliza a chave do livro.

---

## 🏷️ Sistema de Tags
- A ideia é que os próprios usuários tornem a busca por temas muito mais fácil.
- Usuários podem adicionar **tags** aos versículos para categorizá-los.
- A busca por tags retorna todos os versículos associados a uma determinada tag.

---

## 🚀 Como Rodar o Projeto
### 📌 Back-end
1. Clone o repositório e entre na pasta do servidor:
   ```sh
   git clone <URL_DO_REPO>
   cd server-side
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente (`.env`):
   ```sh
   PORT=4000
   MONGO_URI=<sua_string_de_conexao_mongodb>
   JWT_SECRET=<sua_chave_secreta>
   ```
4. Inicie o servidor:
   ```sh
   npm start
   ```

### 📌 Front-end
1. Entre na pasta do front-end:
   ```sh
   cd client
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o projeto:
   ```sh
   npm start
   ```

---

**✨ Inspirando com a palavra desde 2024!**

