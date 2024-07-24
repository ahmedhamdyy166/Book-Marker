var nameInput=document.getElementById("name");
var urlInput=document.getElementById("url");
var addbtn=document.getElementById("addBtn");
var tableBody=document.getElementById("tablebody");
var bookMarks;
var mainIndex=0;

if(localStorage.getItem("bookMarks") == null) {
    bookMarks = [];
} else {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displaybook(bookMarks);
}

var nameRegex = /^[A-Za-z_]{1,}$/;
function isnameValid() {
    return nameRegex.test(nameInput.value);
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{2,}$/;
function isurlValid() {
    return urlRegex.test(urlInput.value);
}

nameInput.onkeyup = function() {
    if (isurlValid() && isnameValid()) {
        addbtn.removeAttribute("disabled");
    } else {
        addbtn.disabled = true;
    }
};

urlInput.onkeyup = function() {
    if (isurlValid() && isnameValid()) {
        addbtn.removeAttribute("disabled");
    } else {
        addbtn.disabled = true;
    }
};

addbtn.onclick = function() {
    var bookMark = {
        name: nameInput.value,
        url: urlInput.value
    };
    if (addbtn.innerHTML == "Update") {
        addbtn.innerHTML = "Submit";
        bookMarks.splice(mainIndex, 1, bookMark);
    } else {
        bookMarks.push(bookMark);
    }
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displaybook(bookMarks);
    clearForm();
};

function displaybook(anyArray) {
    var marks = ``;
    for (var i = 0; i < anyArray.length; i++) {
        marks += `
        <tr>
        <td>${anyArray[i].name}</td>
        <td><button class="btn btn-success" onclick="window.open('${anyArray[i].url}', '_blank')">Visit</button></td>
        <td><button onclick="updateBook(${i})" class="btn btn-info">Update</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
    }
    tableBody.innerHTML = marks;
}

function deleteBook(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displaybook(bookMarks);
}

function clearForm() {
    nameInput.value = "";
    urlInput.value = "";
}

function updateBook(index) {
    nameInput.value = bookMarks[index].name;
    urlInput.value = bookMarks[index].url;
    addbtn.innerHTML = "Update";
    mainIndex = index;
}

function search(term) {
    var wantedBook = [];
    for (var i = 0; i < bookMarks.length; i++) {
        if (bookMarks[i].name.toLowerCase().includes(term.toLowerCase())) {
            wantedBook.push(bookMarks[i]);
        }
    }
    displaybook(wantedBook);
}
