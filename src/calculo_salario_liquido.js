const readline = require('readline'); 

const input = readline.createInterface(   
    process.stdin,                        
    process.stdout                        
);

function calcularINSS(salarioBruto) {
    let inss;

    if (salarioBruto <= 1412.00) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
        inss = salarioBruto * 0.09;
    } else if (salarioBruto <= 4000.03) {
        inss = salarioBruto * 0.12;
    } else {
        inss = salarioBruto * 0.14;
    }

    return Math.min(inss, 908.85);
}



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

function calcularSalarioLiquido(salarioBruto) {
    const inss = calcularINSS(salarioBruto);
    const impostoDeRenda = calcularImpostoDeRenda(salarioBruto);
    const valeTransporte = salarioBruto * 0.08;
    const valeRefeicao = salarioBruto * 0.02;

    const descontos = inss + impostoDeRenda + valeTransporte + valeRefeicao;
    const salarioLiquido = salarioBruto - descontos;

    return {
        salarioLiquido: salarioLiquido.toFixed(2),
        inss: inss.toFixed(2),
        impostoDeRenda: impostoDeRenda.toFixed(2),
        valeTransporte: valeTransporte.toFixed(2),
        valeRefeicao: valeRefeicao.toFixed(2)
    };
    
}

input.question("Qual o seu salario bruto no último mês? ", (salarioBruto) => {
    salarioBruto = parseFloat(salarioBruto); // Converter a entrada para um número
    
    const resultado = calcularSalarioLiquido(salarioBruto);
    
    console.log("O valor do INSS é: " + resultado.inss + " reais");
    console.log("O valor do imposto de renda é: " + resultado.impostoDeRenda + " reais");
    console.log("O valor do vale transporte é: " + resultado.valeTransporte + " reais");
    console.log("O valor do vale refeição é: " + resultado.valeRefeicao + " reais");
    console.log("O salário líquido é: " + resultado.salarioLiquido + " reais");
    
    input.close();
});
