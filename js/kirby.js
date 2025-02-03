const button = document.querySelector(".kirby-reveal");
const image = document.querySelector(".main-image")

function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

function changeImage(x,image){
    if(x==1) {
        image.src = 'pictures/kirby1.jpg';
    }
    if(x==2) {
        image.src = 'pictures/IMG_4943.jpg';
    }}

button.addEventListener("click", () => {
    changeText (button, "September 27, 2023, 6:12 PM")
    button.style.color="black"
    button.style.background="none"
    button.style.font="sans-serif"
});

image.addEventListener("click", () => {
    changeImage (image, image.src = 'pictures/kirby2.jpg')
})