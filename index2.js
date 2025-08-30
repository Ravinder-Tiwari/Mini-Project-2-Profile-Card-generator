let upbtn = document.querySelector("#upcard");
let downbtn = document.querySelector("#downcard");
let addbtn = document.querySelector("#addcard");
let formcontainer = document.querySelector(".form-container");
let closebtn = document.querySelector(".close-btn");
const container = document.querySelector(".cards");
let colors = document.querySelectorAll(".color-dot"); 
let mouse = document.querySelector(".mouse");
mouse.addEventListener("mouseover",function(){
    mouse.style.backgroundColor = "Yellow";
})
mouse.addEventListener("mouseout",function(){
    mouse.style.backgroundColor = "white";
})

// let mouse = document.querySelector(".mouse");
window.addEventListener("mousemove",function(mov){
    mouse.style.top = mov.clientY + "px";
    mouse.style.left= mov.clientX + "px";
})
mouse.addEventListener("dblclick",function(){
    mouse.style.backgroundColor = "yellow"
})
mouse.addEventListener("mouseout",function(){
    mouse.style.backgroundColor = "white";
})
colors.forEach(function (dot) {
    dot.addEventListener("click", function () {
        // Select all cards
        document.querySelectorAll(".card").forEach(function(card) {
            card.style.backgroundColor = dot.dataset.color;
        });
        localStorage.setItem("cardBackground", dot.dataset.color);
    });
});

const savedColor = localStorage.getItem("cardBackground");
if (savedColor) {
    document.querySelectorAll(".card").forEach(function(card) {
        card.style.backgroundColor = savedColor;
    });
}



// On page load, restore saved background color
// Select all text inputs
// Select the form
const form = document.querySelector('form');
// Select individual inputs
const imageUrlInput = document.querySelector('form input[placeholder="https://example.com/photo.jpg"]');
// console.dir(imageUrlInput);
const fullNameInput = document.querySelector('form input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('form input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('form input[placeholder="e.g., Quick appointment note"]');

// Select all category radio buttons
const categoryInputs = document.querySelectorAll('form input[name="category"]');

// Select the submit button
const submitBtn = document.querySelector('form .submit-btn');

function savetolocalstorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldtasks = [];
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks));
    } else {
        let oldtasks = localStorage.getItem("tasks");
        oldtasks = JSON.parse(oldtasks);
        oldtasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldtasks));
    }
}
//COde start here;


addbtn.addEventListener("click", function () {
    formcontainer.style.display = "initial";
    addbtn.style.backgroundColor = "white";
})
closebtn.addEventListener("click", function () {
    formcontainer.style.display = "none";
    addbtn.style.backgroundColor = "#333";
});
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let selected = false;
    categoryInputs.forEach(function (cat) {
        if (cat.checked) {
            selected = cat.value;
        }
    })
    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();
    if (imageUrl === "") {
        alert("Please enter required fields");
        return;
    }
    if (fullName === "") {
        alert("Please enter required fields");
        return;
    }
    if (homeTown === "") {
        alert("Please enter required fields");
        return;
    }
    if (purpose === "") {
        alert("Please enter required fields");
        return;
    }
    if (!selected) {
        alert("please select a category");
    }
    savetolocalstorage({
        // id: Date.now(), 
        imageUrl,
        fullName,
        homeTown,
        purpose,
        selected
    })
    form.reset();
    formcontainer.style.display = "none";
});
// Create main container
// const cardsContainer = document.querySelector(".cards");

function showCards() {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // container.innerHTML = "";

    allTasks.forEach(function (task) {
        const card = document.createElement("div");
        card.classList.add("card");

        // Avatar container
        const avatarDiv = document.createElement("div");
        avatarDiv.classList.add("avatar");
        avatarDiv.style.backgroundColor = "red";

        const avatarImg = document.createElement("img");
        avatarImg.classList.add("imgbox");
        avatarImg.src = task.imageUrl;
        avatarImg.alt = task.fullName || "Profile photo";

        avatarDiv.appendChild(avatarImg);

        // Info section
        const info = document.createElement("div");
        info.classList.add("info");

        const name = document.createElement("h2");
        name.textContent = task.fullName;

        const homeTownDetails = document.createElement("div");
        homeTownDetails.classList.add("details");
        homeTownDetails.innerHTML = `<span>Home town</span><span>${task.homeTown}</span>`;

        const noteDetails = document.createElement("div");
        noteDetails.classList.add("details");
        noteDetails.innerHTML = `<span>Note</span><span>${task.purpose}</span>`;

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const callBtn = document.createElement("button");
        callBtn.classList.add("call-btn");
        callBtn.textContent = "📞 Call";

        const messageBtn = document.createElement("button");
        messageBtn.classList.add("message-btn");
        messageBtn.textContent = "Message";

        actions.appendChild(callBtn);
        actions.appendChild(messageBtn);

        info.appendChild(name);
        info.appendChild(homeTownDetails);
        info.appendChild(noteDetails);
        info.appendChild(actions);

        card.appendChild(avatarDiv);
        card.appendChild(info);

        container.appendChild(card);
    });
}
showCards();

function updatecontainer() {
    const cards = document.querySelectorAll(".cards .card");
    for(let index = 0;index<3;index++){
        card.style.zIndex = 3 - index;
        card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
        card.style.opacity = `${1 - index * 0.02}`;
    };
}


upbtn.addEventListener("click", function () {
    let lastchild = container.lastElementChild;
    upbtn.style.backgroundColor = "white";
    downbtn.style.backgroundColor = "#333";
    upbtn.style.color = "black";
    downbtn.style.color = "#FFFF00";

    if (lastchild) {
        container.insertBefore(lastchild, container.firstElementChild);
        updatecontainer();
    }
}
);
downbtn.addEventListener("click", function () {
    let firstchild = container.firstElementChild;
    downbtn.style.backgroundColor = "white";
    upbtn.style.backgroundColor = "#333";
    upbtn.style.color = "#FFFF00";
    downbtn.style.color = "black";

    if (firstchild) {
        container.appendChild(firstchild);
        updatecontainer();
    }
}
);
