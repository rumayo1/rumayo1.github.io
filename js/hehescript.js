const button = document.querySelector(".hehe-reveal");
const image = document.querySelector(".main-image")

function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

function changeImage(x,image){
    if(x==1) {
        image.src = 'pictures/hehe1.jpg';
    }
    if(x==2) {
        image.src = 'pictures/IMG_4938.jpg';
    }}

button.addEventListener("click", () => {
    changeText (button, "January 5, 2025, 11:31 PM")
    button.style.color="black"
    button.style.background="none"
    button.style.font="sans-serif"
});

image.addEventListener("click", () => {
    changeImage (image, image.src = 'pictures/hehe2.jpg')
})