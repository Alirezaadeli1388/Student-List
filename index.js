var formEl = document.getElementById('form');
var users = [];

function deleteUser(id) {
    users.splice(id, 1);
    addToScreen(users); 
}

function addUser(event) {
    event.preventDefault();

    var nameInputEl = document.getElementById("nameInput");
    var ageInput = document.getElementById("ageInput");
    var genderInput = document.getElementsByName("gender");

    var selectedGender;
    for (var i = 0; i < genderInput.length; i++) {
        if (genderInput[i].checked) {
            selectedGender = genderInput[i].value;
            break;
        }
    }

    var user = {
        name: nameInputEl.value,
        age: ageInput.value,
        gender: selectedGender
    };

    users.push(user);
    addToScreen(users);
}

function addToScreen(users) {
    var existingRows = document.querySelectorAll('.new');
    existingRows.forEach(function (row) {
        row.remove();
    });

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var row = document.createElement('div');
        row.classList.add("row", "new");
        var numberCol = document.createElement('div');
        numberCol.classList.add("col-1", "col");
        numberCol.id = i;
        var nameCol = document.createElement('div');
        nameCol.classList.add("col-5", "col");
        var ageCol = document.createElement('div');
        ageCol.classList.add("col-2", "col");
        var genderCol = document.createElement('div');
        genderCol.classList.add("col-2", "col");
        var editCol = document.createElement('div');
        editCol.classList.add("col-1", "col");
        var deleteCol = document.createElement('div');
        deleteCol.classList.add("col-1", "col");
        var h2Number = document.createElement('h2');
        h2Number.innerText = i + 1;
        var h2Name = document.createElement('h2');
        h2Name.innerText = user.name;
        var h2Age = document.createElement('h2');
        h2Age.innerText = user.age;
        var h2Gender = document.createElement('h2');
        h2Gender.innerText = user.gender;
        var imgEdit = document.createElement('img');
        imgEdit.src = "./image/edit.png";
        var imgDelete = document.createElement('img');
        imgDelete.src = "./image/delete.png";
        imgDelete.addEventListener('click', (function (index) {
            return function () {
                deleteUser(index);
            };
        })(i));

        document.body.appendChild(row);
        row.appendChild(numberCol);
        numberCol.appendChild(h2Number);
        row.appendChild(nameCol);
        nameCol.appendChild(h2Name);
        row.appendChild(ageCol);
        ageCol.appendChild(h2Age);
        row.appendChild(genderCol);
        genderCol.appendChild(h2Gender);
        row.appendChild(editCol);
        editCol.appendChild(imgEdit);
        row.appendChild(deleteCol);
        deleteCol.appendChild(imgDelete);
    }
}

formEl.addEventListener('submit', addUser);
