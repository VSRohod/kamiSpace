const items = [
    " Falling for the promise of the emptiness machine ",
    " BARK BARK WOOF 🐕‍🦺 ",
    " Percepção sem compreensão é uma combinação perigosa. (Irmãos Lutece) ",
];
const horizontalTextScroll = document.querySelectorAll(".text-scroll");
const verticalTextScroll = document.querySelectorAll(".vertical-text-scroll");

function initializeItems() {
    horizontalTextScroll.forEach((scrollItem) => {
        scrollItem.innerHTML = "";
    });

    verticalTextScroll.forEach((scrollItem) => {
        scrollItem.innerHTML = "";
    });
}

initializeItems();

items.forEach((item) => {
    addItemToScrolls(item);
});

function addItemToScrolls(text) {

    horizontalTextScroll.forEach((scrollItem) => {
        const textItem = document.createElement("span");
        textItem.classList.add("text-item");
        textItem.innerHTML = text;
        scrollItem.appendChild(textItem);

        const star = createStar();
        star.classList.add("star");
        scrollItem.appendChild(star);
    });

    verticalTextScroll.forEach((scrollItem) => {
        const textItem = document.createElement("span");
        textItem.classList.add("vertical-text-item");
        const firstWord = text.split(" ")[0];
        textItem.textContent = firstWord;
        scrollItem.appendChild(textItem);

        const star = createStar();
        scrollItem.appendChild(star);
    });
}

function createStar() {
    const star = document.createElement("span");
    star.textContent = "★";
    return star;
}
