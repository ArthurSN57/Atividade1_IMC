window.onload = function(){
    let botaoCalcular = document.getElementById("botaoCalcular");

    botaoCalcular.addEventListener("click", calcularIMC);

    testarCalculos();
}

function limparCampos(){
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("resultadoIMC").value = "";
    document.getElementById("resultadoCategoria").value = "";
    document.getElementById("categoriaIMC").src = "";
    document.getElementById("resultadoContainer").style.display = "none";
}

function calcularIMC(){
    // Recebe os dados de peso e altura
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    // Objeto para classificações de IMC
    let categoriasIMC = [
        {"valorMaximo": 18.5, "texto": "Abaixo do peso", "imagem": "images/AbaixoPeso.png"},
        {"valorMaximo": 25, "texto": "Peso normal", "imagem": "images/PesoNormal.png"},
        {"valorMaximo": 30, "texto": "Sobrepeso", "imagem": "images/ExcessoPeso.png"},
        {"valorMaximo": 100, "texto": "Obesidade", "imagem": "images/Obesidade.png"}
    ];

    // Verifica se os valores estão preenchidos
    if(peso == "" || altura == ""){
        alert("Verifique se todos os campos estão preenchidos.");
        limparCampos();
    } else {
        // Verifica se os valores são numéricos
        let validaNumeros = /^\d+(,\d{1,2}|.\d{1,2})?$/;
        
        if(validaNumeros.test(peso) && validaNumeros.test(altura)){
            // Caso altura seja enviada com vírgula, substitui por ponto para calcular
            altura = altura.replace(",",".");
            
            // Executa cálculo
            let resultado = parseFloat(peso) / ( parseFloat(altura) * parseFloat(altura) );

            document.getElementById("resultadoIMC").value = resultado.toFixed(2);

            // Preenche o resultado conforme categoria do IMC calculado
            for(let i = 0; i < categoriasIMC.length; i++){
                if(resultado < categoriasIMC[i].valorMaximo){
                    document.getElementById("resultadoCategoria").value = categoriasIMC[i].texto;
                    document.getElementById("categoriaIMC").src = categoriasIMC[i].imagem;
                    document.getElementById("resultadoContainer").style.display = "flex";

                    console.log('Resultado: ', resultado.toFixed(2));
                    console.log('Categoria Resultante: ', categoriasIMC[i].texto);
                    break;
                }
            }
        } else {
            alert("Digite apenas valores numéricos para peso e altura.");
            limparCampos();
        }
    }
}

// Testes
function testarCalculos(){
    // Teste 1 - Abaixo do Peso
    document.getElementById("peso").value = "55";
    document.getElementById("altura").value = "1.80";

    calcularIMC();

    // Teste 2 - Peso Normal
    document.getElementById("peso").value = "70";
    document.getElementById("altura").value = "1.70";

    calcularIMC();

    // Teste 3 - Sobrepeso
    document.getElementById("peso").value = "75";
    document.getElementById("altura").value = "1.60";

    calcularIMC();

    // Teste 4 - Obesidade
    document.getElementById("peso").value = "130";
    document.getElementById("altura").value = "1.50";

    calcularIMC();

    limparCampos();
}