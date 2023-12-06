var inputArray = [];
var tokenizedArray = [];
const regexInt = /^-?\d+$/;
const regexString = /^"[^"]*"$/;
const regexChar = /^'.'$/;
const regexDouble = /^-?\d+(\.\d+)?$/;
const regexNotDoubleQuote = /^[^"]+$/;
let lexicalChecker = false;
let syntaxChecker = false;
let semanticChecker = true;

function analyze(){

    var userInput = document.getElementById("userInput").value;

    inputArray = splitString(userInput);

    var outputElement = document.getElementById("array");
    outputElement.innerHTML = "Lexemes: " + inputArray.join(' | ');



    for(var i = 0; i < inputArray.length; i++){//Tokenizer


        if(inputArray[i] === "int" || inputArray[i] === "double" || inputArray[i] === "char" || inputArray[i] === "String"){
            tokenizedArray.push("data_type");
        }
        else if(inputArray[i] === "="){
            tokenizedArray.push("assignment_operator");
        }
        else if(inputArray[i] === ";"){
            tokenizedArray.push("delimiter");
        }
        else if (regexInt.test(inputArray[i]) || regexString.test(inputArray[i]) || regexChar.test(inputArray[i]) || regexDouble.test(inputArray[i])) {
            tokenizedArray.push("value");
        }
        else if(regexNotDoubleQuote.test(inputArray[i])){//Fix this
            tokenizedArray.push("identifier");
        }
        else{
            tokenizedArray.push("ERROR");
            lexicalChecker = true;

        }
    }

    if(lexicalChecker === true){//Lexical Analyzer
        var outputElement = document.getElementById("lexi");
        outputElement.innerHTML = "Lexical Error";
    }
    else{
        var outputElement = document.getElementById("lexi");
        outputElement.innerHTML = tokenizedArray;

        var outputElement = document.getElementById("lexi2");
        outputElement.innerHTML = "Lexically Correct";

        if(lexicalChecker === false){//Syntax Analyzer

            if(tokenizedArray[0] === "data_type" && tokenizedArray[1] === "identifier" && tokenizedArray[2] === "assignment_operator" && tokenizedArray[3] === "value" && tokenizedArray[4] === "delimiter")
            {
                var outputElement = document.getElementById("syntax");
                outputElement.innerHTML = "Syntactically Correct";
            }
            else if(tokenizedArray[0] === "data_type" && tokenizedArray[1] === "identifier" && tokenizedArray[2] === "delimiter")
            {
                var outputElement = document.getElementById("syntax");
                outputElement.innerHTML = "Syntactically Correct";
            }
            else{
                var outputElement = document.getElementById("syntax");
                outputElement.innerHTML = "Syntactically Incorrect";
                syntaxChecker == true;
            }
        }
    }

    if(syntaxChecker === false){
        if(inputArray.length === 5){//Semantic Analyzer for Assignment Operation
            if(inputArray[0] === "int" && regexInt.test(inputArray[3]) || inputArray[0] === "String" && regexString.test(inputArray[3]) || inputArray[0] === "char" && regexChar.test(inputArray[3]) || inputArray[0] === "double" && regexDouble.test(inputArray[3])){
                semanticChecker == false;
            }
            else{
                semanticChecker == true;
            }
        }
        else{
            semanticChecker == false;
        }
    }

    if(semanticChecker === true){
        var outputElement = document.getElementById("semantic");
        outputElement.innerHTML = "Semantically Correct";
    }
    else{
        var outputElement = document.getElementById("semantic");
        outputElement.innerHTML = "Semantically Incorrect";       
    }

}


function lexical(){

}

function syntax(){

}

function semantic(){

}

function splitString(input) {
    let split = [];
    let pattern = /"([^"]*)"|\S+/g;
    let match;

    while ((match = pattern.exec(input)) !== null) {
        let strSplit = match[0];
        split.push(strSplit);
    }

    return split;
}

