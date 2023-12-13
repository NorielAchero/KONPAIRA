let literalInput = "";
let tokenList = "";

const assignOperator = '=';
const delimiter = ';';
const regexInt = /^-?\d+$/;
const regexString = /^"[^"]*"$/;
const regexChar = /^'.'$/;
const regexDouble = /^-?\d+(\.\d+)?$/;
const indentifier = /^[^"]+$/;

let lexBtn = document.getElementById('lexical-btn');
let synBtn = document.getElementById('syntax-btn');
let semBtn = document.getElementById('semantic-btn');


function openFile() {

    var fileInput = document.getElementById('fileInput');
    var fileContentTextArea = document.getElementById('fileContent');
    var file = fileInput.files[0];

    if (file) {

        var reader = new FileReader();

        reader.onload = function (e) {
    
            var fileContent = e.target.result;

   
            fileContentTextArea.value = fileContent;

            let lexBtn = document.getElementById('lexical-btn');
            lexBtn.disabled = false;
        };

        reader.readAsText(file); 
    }

}

function eraseText() {
    document.getElementById("fileContent").value = "";
    var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = "KONPAIRA";

    let lexBtn = document.getElementById('lexical-btn');
    let synBtn = document.getElementById('syntax-btn');
    let semBtn = document.getElementById('semantic-btn');

    lexBtn.disabled = true;
    semBtn.disabled = true;
    synBtn.disabled = true;    

    literalInput = "";
    tokenList = "";

    let myTextarea = document.getElementById('fileContent');
    myTextarea.readOnly = false;

}

function lexicalAnalyzer(){


    var textareaElement = document.getElementById('fileContent');

    let myTextarea = document.getElementById('fileContent');
    myTextarea.readOnly = true;

    var inputValue = textareaElement.value;
    
    var lines = inputValue.split('\n');


   
    let lexicalChecker = true;


    for(let line of lines){
        console.log("HAHAHA")

        var lexemes = splitString(line);
  
        for(let lexeme of lexemes){
            
        if(lexeme === "int" || lexeme === "double" || lexeme === "char" || lexeme === "String"){
            literalInput += lexeme + "|";
            console.log("<data_type> ");
            tokenList += "data_type ";
        }
        else if(lexeme === assignOperator){
            literalInput += lexeme + "|";
            console.log("<assignment_operator> ")
            tokenList += "assignment_operator ";
        }
        else if(regexInt.test(lexeme) || regexString.test(lexeme) || regexChar.test(lexeme) || regexDouble.test(lexeme)){
            literalInput += lexeme + "|";
            console.log("<value> ");
            tokenList += "value ";
        }
        else if(lexeme === delimiter){
            literalInput += lexeme + "|";
            console.log("<delimiter> ");
            tokenList += "delimiter ";
        }
        else if(indentifier.test(lexeme)){
            literalInput += lexeme + "|";
            console.log("<identifier> ");
            tokenList += "identifier ";
        }
        else{
            literalInput += lexeme + "|";
            tokenList += "ERROR ";
            lexicalChecker = false;
        }
        
        }

        lexemes = [];
        literalInput += "\n";
        tokenList += "\n";

    }   

    var outputElement = document.getElementById("output");

    if(lexicalChecker === true){
        outputElement.innerHTML = "LEXICAL PASSED";
        let synBtn = document.getElementById('syntax-btn');
        synBtn.disabled = false;
    }
    else{
        outputElement.innerHTML = "LEXICAL ERROR";
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

function syntaxAnalyzer(){
    var lines = tokenList.split('\n');

    console.log(lines);

    var syntaxCheck = [];

    for(let line of lines){

        if(line !== ""){

            if(line === "data_type identifier assignment_operator value delimiter "){
                syntaxCheck.push("YES");
            }
            else if(line === "data_type identifier delimiter "){
                syntaxCheck.push("YES");
            }
            else{
                syntaxCheck.push("NO");
            }
        }
    }

    var outputElement = document.getElementById("output");

    if(syntaxCheck.includes("NO")){
        outputElement.innerHTML = "SYNTAX ERROR";
    }
    else{
        outputElement.innerHTML = "SYNTAX PASSED";
        let semBtn = document.getElementById('semantic-btn');
        semBtn.disabled = false;
    }

}

function semanticAnalyzer(){

    var lines = literalInput.split('\n');

    console.log(lines);

    var valArray = [];

    var outputArray = [];

    console.log("Lines Lenght is " + lines.length);


    lines.forEach(function(line){

       valArray = line.split('|');
        console.log(valArray);

        console.log("Line Lenght is " + valArray.length);

        
            if(valArray.length === 6){
            
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
            else if(valArray.length === 4){
                    //Do nothing
            }
            else if(valArray.length === 1 && valArray[0]===""){
                    //Do nothing
            }
            else{
                console.log(valArray[0] + " " + valArray[3] + " Last");
                outputArray.push("[[Semantically InCorrect!]]");
                
            }

       valArray = [];
    });



    if(outputArray.includes("[[Semantically InCorrect!]]")){
        var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = "SEMANTIC ERROR";
    }
    else{
        var outputArrayElement = document.getElementById("output");
        outputArrayElement.innerHTML = "SEMANTIC PASSED";
    }


}



