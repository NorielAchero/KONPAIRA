
let linesToAnalyze = document.getElementById('linesToAnalyze')

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


function lexicalAnalyzer(){
    
}