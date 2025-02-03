const button = document.querySelector(".angel-reveal");
const image = document.querySelector(".main-image")

function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

function changeImage(x,image){
    if(x==1) {
        image.src = 'pictures/dragon.jpg';
    }
    if(x==2) {
        image.src = 'pictures/IMG_4940.jpg';
    }}

button.addEventListener("click", () => {
    changeText (button, "April 4, 444, 4:44 AM")
    button.style.color="black"
    button.style.background="none"
    button.style.font="sans-serif"
});

image.addEventListener("click", () => {
    changeImage (image, image.src = 'pictures/angel.jpg')
})