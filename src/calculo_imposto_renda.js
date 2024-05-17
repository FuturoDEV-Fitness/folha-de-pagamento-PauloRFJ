// implemente uma função que retorne o valor a ser pago de imposto de renda, com base no salário bruto recebido. As regras são, para salários até 2112.00 reais, alícota isenta e zero de parcela para deduzir, para salários de 2112.00 até 2826.65, alícota de 7.5% e R$158.40 de parcela para deduzir, para salários  de 2826.66 até 3751.05, alícota de 15% e R$ 370.40 de parcela para deduzir, para salarios de 3751.06 até 4664.68, alícota de 22.5% e R$ 651.73 de parcela para deduzir e para salarios acima de 4664.68, alícota de 27.5% e R$884.96 de parcela para deduzir. No final retorne o valor do imposto de renda.
const readline = require('readline');    // importando a biblioteca

const input = readline.createInterface(   // criando uma instância
    process.stdin,                        // entrada de dados
    process.stdout                        // saida de dados
);

function calcularImpostoDeRenda(salarioBruto) {
    let aliquota;
    let parcelaDeduzir;

    if (salarioBruto <= 2112.00) {
        aliquota = 0;
        parcelaDeduzir = 0;
    } else if (salarioBruto <= 2826.65) {
        aliquota = 0.075;
        parcelaDeduzir = 158.40;
    } else if (salarioBruto <= 3751.05) {
        aliquota = 0.15;
        parcelaDeduzir = 370.40;
    } else if (salarioBruto <= 4664.68) {
        aliquota = 0.225;
        parcelaDeduzir = 651.73;
    } else {
        aliquota = 0.275;
        parcelaDeduzir = 884.96;
    }

    return (salarioBruto * aliquota) - parcelaDeduzir;
}

input.question("Qual o seu salario bruto no último mês? ", (salarioBruto) => {
    salarioBruto = parseFloat(salarioBruto); // Converter a entrada para um número

    const impostoDeRenda = calcularImpostoDeRenda(salarioBruto);

    console.log("O valor do imposto de renda é: " + impostoDeRenda.toFixed(2) + " reais");

    input.close();
});
