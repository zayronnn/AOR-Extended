const { networkInterfaces } = require("os");
const readlineSync = require("readline-sync");
const fs = require("node:fs");

const getAdapterIp = () => {
  const interfaces = networkInterfaces();

console.log();
    console.log('Selecione o Adptador de rede principal.');
	console.log('Nao recomendamos o Uso de VPN ou NoPing (fale conosco caso use!');
	console.log('Compatibilidade com (ExitLag) Ative o modo Legado');
	console.log('.');
    console.log('Selecione um dos adaptadores que voce usa para se conectar a Internet:');
	console.log('.');

  let i = 1;
  const selection = {};
  const selectionName = {};
  for (const [name, value] of Object.entries(interfaces)) {
    const detail = value.find((v) => v.family === "IPv4");
    if (!detail) continue;
    selection[i] = detail.address;
    selectionName[i] = name;
    console.log(`  ${i}. ${name}\t ip address: ${detail.address}`);
    i++;
  }

  let selectedIp;
  let selectedName;

  while (true) {
    console.log();
    let userSelect = readlineSync.question("insira o numero aqui: ");
    selectedIp = selection[userSelect];
    selectedName = selectionName[userSelect];

    if (selectedIp) break;

    console.clear();
    console.log("Entrada invalida, tente novamente");
    console.log();

    console.log();
    console.log(
      "Selecione um dos adaptadores que voce usa para se conectar a Internet:",
    );

    for (let j = 1; j < i; j++) {
      console.log(`  ${j}. ${selectionName[j]}\t ip address: ${selection[j]}`);
    }
  }

  console.log();
  console.log(`Voce selecionou "${selectedName} - ${selectedIp}"`);
  console.log();

  fs.writeFile("ip.txt", selectedIp, (err) => {
    if (err) console.log("Erro ao salvar ip.");
  });

  return selectedIp;
};

module.exports = {
  getAdapterIp,
};
