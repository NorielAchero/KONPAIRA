


function openFile() {
    var fileInput = document.getElementById('fileInput');
    var fileContentTextArea = document.getElementById('fileContent');
    var file = fileInput.files[0];

    if (file) {
        // Use FileReader to read the contents of the file
        var reader = new FileReader();

        reader.onload = function (e) {
            // The file content is accessible here
            var fileContent = e.target.result;

            // Load the content into the text area
            fileContentTextArea.value = fileContent;
        };

        reader.readAsText(file); // You can use other methods like readAsDataURL for images
    } else {
        alert("Please choose a file first.");
    }
}

function eraseText() {
    document.getElementById("fileContent").value = "";
}

function lexicalAnalyzer(){

    const dataType = "int";
    const assignOperator = '=';
    const delimiter = ';';
    const regexInt = /^-?\d+$/;
    const regexString = /^"[^"]*"$/;
    const regexChar = /^'.'$/;
    const regexDouble = /^-?\d+(\.\d+)?$/;
    const indentifier = /^[^"]+$/;
    


    var textareaElement = document.getElementById('fileContent');

    var inputValue = textareaElement.value;

    var lexemes = splitString(inputValue);

    var resultListElement = document.getElementById('lexemeList');

    resultListElement.innerHTML = '';

    for (var i = 0; i < lexemes.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = lexemes[i];
        resultListElement.appendChild(listItem);
    }

    let tokens = [];
    let lexicalChecker = true;
  
    for(let lexeme of lexemes){
     if(lexeme === "int" || lexeme === "double" || lexeme === "char" || lexeme === "String"){
        tokens.push("<data_type>");
     }
     else if(lexeme === assignOperator){
        tokens.push("<assignment_operator>");
     }
     else if(regexInt.test(lexeme) || regexString.test(lexeme) || regexChar.test(lexeme) || regexDouble.test(lexeme)){
        tokens.push("<value>");
     }
     else if(lexeme === delimiter){
        tokens.push("<delimiter>");
     }
     else if(indentifier.test(lexeme)){
        tokens.push("<identifier>");
     }
     else{
        tokens.push("<ERROR>");
        lexicalChecker = false;
     }
     
    }

    var tokenListElement = document.getElementById('tokenList');

    tokenListElement.innerHTML = '';

    for (var i = 0; i < tokens.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = tokens[i];
        tokenListElement.appendChild(listItem);
    }


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

