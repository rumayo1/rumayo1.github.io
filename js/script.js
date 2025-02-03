const header = document.querySelector(".title"); 
const button = document.querySelector(".button");
const button1 = document.querySelector(".hehe-reveal");

header.addEventListener("mouseover", () => {
    header.style.color="red";
});


function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

header.addEventListener("click", () => {
    changeText(header, "hey!")
});

button.addEventListener("click", () => {
    changeText (button, "Click the images!")
});

button1.addEventListener("click", () => {
    changeText (button1, "date")
});
//const paragraph = document.querySelector("p"); 
//paragraph.style.color = "red";


//const button2 = document.querySelector('.myButton2');
//const title = document.querySelector('h1')
//function changeText(textObject, newText){
//    textObject.textConstant = newText;
//}

//button2.addEventListener('click', () => {
//    changeText(h1, "text changed!")
//} )
