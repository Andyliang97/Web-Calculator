let buffer = 0; //the buffer used to temporary save the result
let operator = ''; //the variable to store the clicked opeartor
let operatorClicked = false; //to check if the operator is clicked
let equalClicked = false; //ot check if the equal sign is clicked

function init() {
    document.querySelector(".calculator-box").addEventListener("click", function(event) {
        //console.log(event.target.innerText);
        
        //to make sure it only performs on the buttons
        if (event.target.tagName != 'P' && event.target.tagName != 'DIV'){
            judge(event.target.innerText);
        }
        event.stopPropagation(); //prevent event bubbling outside of the class
        
    });
  }

/**
* to judge which button is clicked and perform corresponding behavior 
* @param {string} value the clicked button
*/
function judge(value){
    if (value === 'C'){
        reset();
        document.querySelector(".result").innerText = 0;
    }
    else if (value === '←'){
        const currentText = document.querySelector(".result");
        const length = currentText.innerText.length
        if (length > 1){
            currentText.innerText = currentText.innerText.substr(0, length - 1);
        }
        else{
            currentText.innerText = 0;
        }
    }
    else if (isNaN(parseInt(value))){
        if (value === '='){
            calculate();
            document.querySelector(".result").innerText = buffer;
            reset();
            equalClicked = true;
        }
        else {
            calculate();
            document.querySelector(".result").innerText = buffer;
            operator = value;
            operatorClicked = true;
            equalClicked = false;
        }
    }
    else{
        console.log('number');
        numChange(value);
        equalClicked = false;
            
    }
            
}

/**
 * to calculate the result. It works on both equal sign and operator.
 */
function calculate(){
    const tempNum = parseInt(document.querySelector(".result").innerText);
    switch (operator){
        case '+':
            buffer += tempNum;
            break;
        case '-':
            buffer -= tempNum;
            break;
        case '×':
            buffer *= tempNum;
            break;
        case '÷':
            buffer /= tempNum;
            buffer = Math.round(buffer);
            break;
        default:
            buffer = tempNum;
            break;
    }

}

/**
 * reset all the variable to default
 */
function reset(){
    buffer = 0;
    operator = '';
    operatorClicked = false;
    equalClicked = false;
}

/**
 * to decide what number should be displayed on the calculator.
 * @param {string} value  clicked number button
 */
function numChange(value){
    const currentText = document.querySelector(".result");
    console.log(`currentText=${currentText.innerText}`);
    if (!operatorClicked){
        if ((currentText.innerText === '0' && value !== '0')||equalClicked){
            currentText.innerText = value;
        }
        else if (currentText.innerText !== '0'){
            currentText.innerText += value;
        }
    }
    else {
        currentText.innerText = value;
        operatorClicked = false;
    }
}

init();
  