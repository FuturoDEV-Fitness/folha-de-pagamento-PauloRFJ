// implemente uma função que retorne o valor a ser pago de INSS, com base no salário bruto recebido. Use as regras abaixo:

// Considere o teto do INSS como R$ 908,85 e, o modelo de cálculo simples, considerado a porcentagem sobre o valor total.  Se salário bruto for até 1412.00 reais, desconto de 7.5%, se for entre 1412.01 e 2666.68 reais, desconto de 9%, se for entre 2666.69 e 4000.03 reais, desconto de 12%, e se for acima de 4000.04 reais, desconto de 14% e no final retorne o valor do desconto e o valor do salário liquido.
const readline = require('readline');    // importando a biblioteca

const input = readline.createInterface(   // criando uma instância
    process.stdin,                        // entrada de dados
    process.stdout                        // saida de dados
);

input.question("Qual o seu salario bruto no último mês? ", (salarioBruto) => {
    salarioBruto = parseFloat(salarioBruto); // Converter a entrada para um número
    let inss;

    if (salarioBruto <= 1412.00) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto > 1412.00 && salarioBruto <= 2666.68) {
        inss = salarioBruto * 0.09;
    } else if (salarioBruto > 2666.68 && salarioBruto <= 4000.03) {
        inss = salarioBruto * 0.12;
    } else {
        inss = salarioBruto * 0.14;
    }

    if (inss > 908.85) {
        inss = 908.85;
    }

    const salarioLiquido = salarioBruto - inss;

    console.log("O valor do INSS é: " + inss.toFixed(2) + " reais");
    console.log("O salário líquido é: " + salarioLiquido.toFixed(2) + " reais");
    
    input.close();
});

