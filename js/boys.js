const button = document.querySelector(".boys-reveal");
const image = document.querySelector(".main-image")

function changeText(objToChange, newText) {
    objToChange.textContent = newText;
};

function changeImage(x,image){
    if(x==1) {
        image.src = 'pictures/boy1.jpg';
    }
    if(x==2) {
        image.src = 'pictures/IMG_4942.jpg';
    }}

button.addEventListener("click", () => {
    changeText (button, "May 26, 2024, 10:39 AM")
    button.style.color="black"
    button.style.background="none"
    button.style.font="sans-serif"
});

image.addEventListener("click", () => {
    changeImage (image, image.src = 'pictures/boy2.jpg')
})