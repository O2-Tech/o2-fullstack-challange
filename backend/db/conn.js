const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://welingtonayres:FXzjSbcTjbBEGRQr@gestaaoestoque.vigffxy.mongodb.net/?retryWrites=true&w=majority&appName=GestaaoEstoque"
    );

    console.log("conectado ao banco");
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;
