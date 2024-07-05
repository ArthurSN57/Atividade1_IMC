window.onload = function(){
    let botaoCalcular = document.getElementById("botaoCalcular");

    botaoCalcular.addEventListener("click", calcularIMC);
}

function limparCampos(){
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
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
        {"valorMaximo": 50, "texto": "Obesidade", "imagem": "images/Obesidade.png"}
    ];

    //Verifica se os valores estão preenchidos
    if(peso == "" || altura == ""){
        alert("Verifique se todos os campos estão preenchidos.");
        limparCampos();
    } else {
        //Verifica se os valores são numéricos
        let validaNumeros = /^\d+(,\d{1,2}|.\d{1,2})?$/;
        
        if(validaNumeros.test(peso) && validaNumeros.test(altura)){
            //Caso altura seja enviada com vírgula, substitui por ponto para calcular
            altura = altura.replace(",",".");
            
            //Executa cálculo
            console.log(parseFloat(altura));
            let resultado = parseFloat(peso) / ( parseFloat(altura) * parseFloat(altura) );

            document.getElementById("resultadoIMC").value = resultado.toFixed(2);

            //Preenche o resultado conforme categoria do IMC calculado
            for(let i = 0; i < categoriasIMC.length; i++){
                if(resultado < categoriasIMC[i].valorMaximo){
                    document.getElementById("resultadoCategoria").value = categoriasIMC[i].texto;
                    document.getElementById("categoriaIMC").src = categoriasIMC[i].imagem;
                    document.getElementById("resultadoContainer").style.display = "flex";

                    break;
                }
            }
        } else {
            alert("Digite apenas valores numéricos para peso e altura.");
            limparCampos();
        }
    }
}