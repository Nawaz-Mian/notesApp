console.log("Notes app project");
showNotes();

//function to add a note
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myNotes = {
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myNotes);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showNotes();
});

//function to show a note
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="cardNotes my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Node</a>
                    </div>
                </div>`;
    });
    let noteEle = document.getElementById('notes');

    if (notesObj.length != 0) {
        noteEle.innerHTML = html;
    }
    else {
        noteEle.innerHTML = `Nothing to show! Use "Add note" section above to add a note`;
    }

};

//function to delete a note
function deleteNode(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//Search the notes 
let search=document.getElementById('searchTxt');
search.addEventListener('input',function () {
    let inputValue = search.value.toLowerCase();
    let cardNotes = document.getElementsByClassName('cardNotes');
    Array.from(cardNotes).forEach(function(element){
         let cardTxt = element.getElementsByTagName('p')[0].innerText;
         if(cardTxt.includes(inputValue)){
            element.style.display = 'block';
         }
         else{
            element.style.display = 'none';
         }
    });
});