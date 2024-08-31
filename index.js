var formEl = document.getElementById('form');
var users = [];
var editIndex = -1;

function deleteUser(id) {
    users.splice(id, 1);
    addToScreen(users);
}

function editUser(index) {
    editIndex = index;
    var user = users[index];
    document.getElementById("editNameInput").value = user.name;
    document.getElementById("editAgeInput").value = user.age;
    var genderInput = document.getElementsByName("editGender");
    for (var i = 0; i < genderInput.length; i++) {
        if (genderInput[i].value === user.gender) {
            genderInput[i].checked = true;
            break;
        }
    }
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

function saveChanges() {
    var nameInputEl = document.getElementById("editNameInput");
    var ageInput = document.getElementById("editAgeInput");
    var genderInput = document.getElementsByName("editGender");

    var selectedGender;
    for (var i = 0; i < genderInput.length; i++) {
        if (genderInput[i].checked) {
            selectedGender = genderInput[i].value;
            break;
        }
    }

    users[editIndex] = {
        name: nameInputEl.value,
        age: ageInput.value,
        gender: selectedGender
    };

    addToScreen(users);
    var editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
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
    formEl.reset();
}

function addToScreen(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';

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
        imgEdit.addEventListener('click', (function (index) {
            return function () {
                editUser(index);
            };
        })(i));
        var imgDelete = document.createElement('img');
        imgDelete.src = "./image/delete.png";
        imgDelete.addEventListener('click', (function (index) {
            return function () {
                deleteUser(index);
            };
        })(i));

        userList.appendChild(row);
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

document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);

formEl.addEventListener('submit', addUser);