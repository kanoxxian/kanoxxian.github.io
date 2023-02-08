let xArr = [];
const validEmail = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9-]+\.[a-zA-Z]{2,8}(\.[a-zA-Z]{2,8})?$/;
const infoMsg = document.getElementById("user-message");
const form = document.getElementById("form");
const pic = document.getElementById("image-save");
const imageoutput = document.getElementById("imageoutput");
const save_btn = document.querySelector('.btn-save');
const refrsh_btn = document.querySelector('.btn-refresh');
const hide = document.getElementById("nothing-saved");
const show = document.getElementById("user-message");
let url = "";
let first = "";

// Grabs a Random Image and Loads on Site load.
function randomImage() {
    let randomNum = Math.floor(Math.random()*1000);
    let url = `https://picsum.photos/id/${randomNum}/250`;
    pic.src = url;
    infoMsg.innerHTML = "";
}
window.onload = randomImage();


//creates image list in DOM
function imagelist() {
    list();
    imageoutput.innerHTML = `<ul>${list()}</ul>`;
    randomImage();
}

function list() {
    emails = "";
    for ( let i = 0; i < xArr.length; i++ ){
        emails += `
        <li id="${xArr[i][0]}"><h4>${xArr[i][0]}</h4>
            <ul>${Ulist(i)}</ul>
        </li>`
    }
    return emails;
}
function Ulist(i) {
    picList = "";
    for ( let j = 0; j < xArr[i][1].length; j++ ) {
        picList += `<li><img src="${xArr[i][1][j]}" alt=""></li>`
    }
    return picList;
}

// pushes the last email entered to the top.
function setOnGoing(email) {
    if (first !== "") {
        first.classList.remove("newest");
    }
    first = document.getElementById(`${email}`);
    first.classList.add("newest");
}

// Email validation function
function checkMail(email) {
    show.classList.remove('email-error')
    return validEmail.test(email);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let emailAdd = [];
    let thisImage = pic.src;
    console.log(thisImage);

    // Email Validation
    infoMsg.innerHTML = "";
    let email = document.getElementById("email").value;
    if (!checkMail(email)) {
        show.classList.add('email-error')
        infoMsg.innerHTML = "Please enter a valid email address";
        return;
    } 

    // Makes and array of all stored addresses.
    for ( let i = 0; i < xArr.length; i++ ) {
        emailAdd.push(xArr[i][0]);
        console.log(emailAdd);
    }
    if (emailAdd.includes(email)) {
        let position = emailAdd.indexOf(email);
        console.log(`Email address already entered ${position}`);
        // Checks if the email has already been entered.
        if (xArr[position][1].includes(thisImage)) {
            randomImage();
            infoMsg.innerHTML = "Picture already added";
            return;
        }
        // Links the email with relevant image.
        xArr[position][1].push(thisImage);
        imagelist();
        setOnGoing(email);
        infoMsg.innerHTML = "New picture added";
        return;
    } else {
        // Adds email/pic to array.
        xArr.push([email, [thisImage]]);
        console.log(`${email} and ${thisImage} have been added to the array`);
        imagelist();
        infoMsg.innerHTML = "New picture added";
        show.classList.add('added-image');
    }
});

save_btn.addEventListener('click', function() {
    hide.classList.add('hidden');
    show.classList.remove('opacity');
    show.classList.remove('added-image');
});

refrsh_btn.addEventListener('click', function() {
    hide.classList.remove('hidden');
    show.classList.add('opacity');
});