'use strict';

// pegamos o display
const display = document.querySelector('#display');
// pegamos todos elementos que tenham escrito tecla no ID
const numeros = document.querySelectorAll('[id*=tecla]');
// pegamos todos elementos que tenham escrito operador no ID
const operadores = document.querySelectorAll('[id*=operador]');

// variavel responsavel por zerar o display quando necessário, para a entrada de um novo numero
let novoNumero = true;
// variavel para armazenar o operador utilizado
let operador;
// variavel para armazenar o numero anterior
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

// arrow function responsável pelos calculos
const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;

        if(operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == 'x'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '÷'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

// arrow function responsável por atualizar o display, limpando o display se novo número ou concatenando os números
const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
}

// atualizarDisplay recebe o texto de cada uma das teclas clicadas
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
// adicionamos evento de click em todos os numeros
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

//arrow function para criar novo número e armazenar/realizar a operação, sempre que um operador for clicado
const selecionarOperador = (evento) =>{
    if (!novoNumero) {
         calcular();
         novoNumero = true;
         operador = evento.target.textContent;
         numeroAnterior = parseFloat(display.textContent.replace(',','.'));
         console.log(operador);
    }
}

// adicionamos evento de click em todos os operadores
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

// função para ativar o igual e zerar o operador, quando igual for acionado
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
// pegamos a tecla igual e adicionamos um evento de click com a função ativarIgual
document.querySelector('#igual').addEventListener('click',ativarIgual);

// função para ativar o limparDisplay
const limparDisplay= () => {
    display.textContent = ''
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

// pegamos a tecla limpar display e adicionamos evento de click com a função limparDisplay
document.querySelector('#limparDisplay').addEventListener('click',limparDisplay);

// função para inverter o sinal
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay (display.textContent * -1);
} 

// pegamos a tecla inverter e adicionamos evento de click com a função inverterSinal
document.querySelector('#inverter').addEventListener('click', inverterSinal);

// verificação se há decimal ou valores
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

// função inserirDecimal
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}

// pegamos a tecla decimal(virgula) e adicionamos evento de click com a função inserirDecimal
document.querySelector('#decimal').addEventListener('click', inserirDecimal);



// mapeamento de teclas
const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorSomar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparDisplay',
    'Backspace' : 'limparDisplay',
    ','         : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);


