let literalInput = "";
let tokenList = "";

const assignOperator = '=';
const delimiter = ';';
const regexInt = /^-?\d+$/;
const regexString = /^"[^"]*"$/;
const regexChar = /^'.'$/;
const regexDouble = /^-?\d+(\.\d+)?$/;
const indentifier = /^[^"]+$/;


function openFile() {
    var fileInput = document.getElementById('fileInput');
    var fileContentTextArea = document.getElementById('fileContent');
    var file = fileInput.files[0];

    if (file) {

        var reader = new FileReader();

        reader.onload = function (e) {
    
            var fileContent = e.target.result;

   
            fileContentTextArea.value = fileContent;
        };

        reader.readAsText(file); 
    } else {
        alert("Please choose a file first.");
    }
}

function eraseText() {
    document.getElementById("fileContent").value = "";
    var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = " ";
}

function lexicalAnalyzer(){


    var textareaElement = document.getElementById('fileContent');

    var inputValue = textareaElement.value;
    
    var lines = inputValue.split('\n');


   
    let lexicalChecker = true;


    for(let line of lines){
        console.log("HAHAHA")

        var lexemes = splitString(line);
  
        for(let lexeme of lexemes){
            
        if(lexeme === "int" || lexeme === "double" || lexeme === "char" || lexeme === "String"){
            literalInput += lexeme + " ";
            console.log("<data_type> ");
            tokenList += "data_type ";
        }
        else if(lexeme === assignOperator){
            literalInput += lexeme + " ";
            console.log("<assignment_operator> ")
            tokenList += "assignment_operator ";
        }
        else if(regexInt.test(lexeme) || regexString.test(lexeme) || regexChar.test(lexeme) || regexDouble.test(lexeme)){
            literalInput += lexeme + " ";
            console.log("<value> ");
            tokenList += "value ";
        }
        else if(lexeme === delimiter){
            literalInput += lexeme + " ";
            console.log("<delimiter> ");
            tokenList += "delimiter ";
        }
        else if(indentifier.test(lexeme)){
            literalInput += lexeme + " ";
            console.log("<identifier> ");
            tokenList += "identifier ";
        }
        else{
            literalInput += lexeme + " ";
            tokenList += "ERROR ";
            lexicalChecker = false;
        }
        
        }

        lexemes = [];
        literalInput += "|";
        tokenList += "|";

    }   

    var lexemeListElement = document.getElementById('lexemeList');
    lexemeListElement.innerHTML = literalInput;

    var tokenListElement = document.getElementById('tokenList');
    tokenListElement.innerHTML = tokenList;


    var outputElement = document.getElementById("output");

    if(lexicalChecker === true){
        outputElement.innerHTML = "Lexical Passed";
    }
    else{
        outputElement.innerHTML = "Lexical Error";
    }

    function splitString(input) {
        let split = [];
        let pattern = /\b(?:int|double|char|String|boolean)\b|[a-zA-Z_$][\w_$]*|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\d+(?:\.\d+)?|[=;]/g;
        let match;
    
        while ((match = pattern.exec(input)) !== null) {
            split.push(match[0]);
        }
    
        return split;
    }

}

function semanticAnalyzer(){

    var lines = literalInput.split('|');

    console.log(lines);

    var valArray = [];

    var outputArray = [];

    console.log("Lines Lenght is " + line.length);


    lines.forEach(function(line){

       valArray = line.split(' ');

        console.log("Line Lenght is " + valArray.length);

       if(valArray.length === 5){
       
            if (valArray[0] === "int" && valArray[3].match(regexInt)) {
                console.log(valArray[0] + " 1 " + valArray[3]);
                    outputArray.push("[[Semantically Correct!]]");
            }
            else if(valArray[0] === "String" && valArray[3].match(regexString)){
                console.log(valArray[0] + " 2 " + valArray[3]);
                    outputArray.push("[[Semantically Correct!]]");
            }
            else if(valArray[0] === "char" && valArray[3].match(regexChar)){
                console.log(valArray[0] + " 3 " + valArray[3]);
                outputArray.push("[[Semantically Correct!]]");
            }
            else if(valArray[0] === "double" && valArray[3].match(regexDouble)){
                console.log(valArray[0] + " 4 " + valArray[3]);
                outputArray.push("[[Semantically Correct!]]");
            }
            else{
                console.log(valArray[0] + " 5 " + valArray[3] );
                outputArray.push("[[Semantically InCorrect!]]");
            }
       }
       else if(valArray.length === 3){
            //Do nothing
       }
       else{
        console.log(valArray[0] + " " + valArray[3] + " Last");
        outputArray.push("[[Semantically InCorrect!]]");
        
       }

       valArray = [];
    });



    var outputArrayElement = document.getElementById("semList");
    outputArrayElement.innerHTML = "SemList are:  \n" + outputArray.join('\n');

    if(outputArray.includes("[[Semantically InCorrect!]]")){
        var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = "Semantic Error";
    }
    else{
        var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = "Semantic Passed";
    }


}

