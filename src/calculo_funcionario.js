const readline = require('readline'); 
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

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

let funcionario = "";
let CPF_funcionario = "";

input.question("Qual o seu nome? ", (nome) => {
    funcionario = nome;
    input.question("Qual o seu CPF (digitar no formato xxx.xxx.xxx-xx)? ", (CPF) => {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!regex.test(CPF)) {
            console.log("CPF inválido");
            input.close();
            return;
        }
        CPF_funcionario = CPF;
        input.question("Qual o seu salario bruto no último mês? ", (salarioBruto) => {
            salarioBruto = parseFloat(salarioBruto); // Converter a entrada para um número
        
            const resultado = calcularSalarioLiquido(salarioBruto);

            console.log("--- Folha de Pagamento ---");
            console.log("Nome: " + funcionario);
            console.log("CPF: " + CPF_funcionario);
            console.log("Salário bruto: R$ " + salarioBruto);
            console.log("INSS: R$ " + resultado.inss);
            console.log("Imposto de Renda: R$ " + resultado.impostoDeRenda);
            console.log("Vale Transporte: R$ " + resultado.valeTransporte);
            console.log("Vale Refeição: R$ " + resultado.valeRefeicao);
            console.log("Salário Líquido: R$ " + resultado.salarioLiquido);

            input.question("Deseja gerar um PDF com a folha de pagamento? (sim/não) ", (resposta) => {
                if (resposta.toLowerCase() === 'sim') {
                    gerarPDF(funcionario, CPF_funcionario, salarioBruto, resultado);
                }
                input.close();
            });
        });
    });
});

function gerarPDF(nome, cpf, salarioBruto, resultado) {
    const doc = new PDFDocument();
    const dir = './folhas_pagamento';
    const fileName = `${nome.replace(/ /g, '_')}_folha_pagamento.pdf`;
    const filePath = path.join(dir, fileName);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('--- Folha de Pagamento ---', {align: 'center'});
    doc.fontSize(14).text(`Data da Geração: ${new Date().toLocaleDateString()}`);
    doc.text(`Nome: ${nome}`)
    doc.text(`CPF: ${cpf}`);
    doc.text("--- ---")
    doc.text(`Salário bruto: R$ ${salarioBruto.toFixed(2)}`);
    doc.text("--- ---")
    doc.text(`INSS: R$ ${resultado.inss}`);
    doc.text(`Imposto de Renda: R$ ${resultado.impostoDeRenda}`);
    doc.text(`Vale Transporte: R$ ${resultado.valeTransporte}`);
    doc.text(`Vale Refeição: R$ ${resultado.valeRefeicao}`);
    doc.text("--- ---")
    doc.text(`Salário Líquido: R$ ${resultado.salarioLiquido}`);

    doc.end();
    
    console.log(`PDF gerado com sucesso em: ${filePath}`);
}
