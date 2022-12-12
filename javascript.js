let arr = [];
let body = document.querySelector("body")
let container = document.querySelector(".container");
let newButton = document.querySelector(".new");
let forms = document.querySelector("#form")
let submit = document.querySelector("#submit");
let form = submit.parentNode.children;


body.removeChild(forms);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + ", " + (this.read ? "read" : "not read yet");
}

function addBookToLibrary(title, author, pages, read) {
    let obj = new Book(title, author, pages, read);
    arr.push(obj);
}

function displayBook() {
    container.innerHTML = " ";
    for (let i = 0; i < arr.length; i++) {
        let x = arr[i];
        let divButtons = document.createElement("div");
        let deleteButton = document.createElement("button");
        let readCheck = document.createElement("input");
        let readLabel = document.createElement("label");
        readLabel.style.marginRight="5px";
        readCheck.style.marginRight="10px";
        readCheck.setAttribute("type","checkBox");
        readCheck.setAttribute("id","completed");
        readLabel.setAttribute("for","completed");
        readLabel.innerText = "Completed";
        if(x.read){
            readCheck.checked = true;
        }
            
        divButtons.appendChild(readLabel);
        divButtons.appendChild(readCheck);
        divButtons.style.position = "absolute";
        divButtons.style.right = "0px";
        divButtons.style.bottom = "0px";
        deleteButton.innerText = "Delete";
        divButtons.appendChild(deleteButton);
        deleteButton.addEventListener("click", remove);
        readCheck.addEventListener("change",completeing);
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-key", `${i}`);
        card.innerText = x.info();

        card.appendChild(divButtons);
        
        container.appendChild(card);

    }
}


newButton.addEventListener("click", (e) => {
    container.innerHTML = "";
    container.appendChild(forms);

})

function completeing(e){
    let index = e.target.parentNode.parentNode.getAttribute("data-key");
    arr[index].read?arr[index].read = false:arr[index].read = true;
    displayBook();
}


function gathering(e) {
    let vladiation = true;
    let titleNode = form[0].lastElementChild;
    let title = titleNode.value;
    let authorNode = form[1].lastElementChild;
    let author = authorNode.value;
    let pagesNode = form[2].lastElementChild;
    let pages = pagesNode.value;
    let readNode = form[3].lastElementChild;
    let read = readNode.checked ? true : false;
    if (titleNode.checkValidity() && authorNode.checkValidity() && pagesNode.checkValidity()) {
        addBookToLibrary(title, author, pages, read);
        
        displayBook();
        form[0].lastElementChild.value = "";
        form[1].lastElementChild.value = "";
        form[2].lastElementChild.value = "";
        form[3].lastElementChild.checked = false;
        e.preventDefault();
    }

}

function remove(e) {
    let index = e.target.parentNode.parentNode.getAttribute("data-key");
    
    arr.splice(index,1);
    
    displayBook();
}


submit.addEventListener("click", gathering);