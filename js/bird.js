const button = document.querySelector(".bird-reveal");
const image = document.querySelector(".main-image")

function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

function changeImage(x,image){
    if(x==1) {
        image.src = 'pictures/bird1.jpg';
    }
    if(x==2) {
        image.src = 'pictures/IMG_4939.jpg';
    }}

button.addEventListener("click", () => {
    changeText (button, "July 10, 2024, 3:26 PM")
    button.style.color="black"
    button.style.background="none"
    button.style.font="sans-serif"
});

image.addEventListener("click", () => {
    changeImage (image, image.src = 'pictures/bird2.jpg')
})