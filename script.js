var taskContainer = document.querySelector('.taskContainer');
var inputbox = document.querySelector('.textarea');
var cover = document.querySelector('.cover');

function addTask(){
    let div = document.createElement('div');
    div.setAttribute("class", "task");
    taskContainer.appendChild(div);
    
    let checkbtn = document.createElement('span');
    checkbtn.setAttribute("class","checkbox");
    checkbtn.innerHTML = `<i class="bi bi-check-lg"></i>`;
    div.appendChild(checkbtn);

    let taskTitle = document.createElement('p');
    taskTitle.setAttribute("class","taskName");
    taskTitle.innerText = inputbox.value;
    div.appendChild(taskTitle);
    let editBtn = document.createElement('span');
    editBtn.setAttribute("class","editBtn");
    editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    taskTitle.appendChild(editBtn);
    
    let cross = document.createElement('span');
    cross.setAttribute("class","cross");
    cross.innerHTML = `<i class="bi bi-x"></i>`;
    div.appendChild(cross);
}

function scrollBottom(){
    taskContainer.scrollTo(0,taskContainer.scrollHeight);
}

document.querySelector('.add').addEventListener('click',()=>{
    if(inputbox.value=='' || inputbox.value==' ')
      this.disabled = true;
    else{
        this.disabled = false;
        addTask();
        inputbox.value = '';
        scrollBottom();
        saveItem();
    }
});
taskContainer.addEventListener('click',(e)=>{
    if(e.target.tagName=="I" && e.target.className=="bi bi-check-lg"){
           if(e.target.parentElement.className=="checkbox"){
              e.target.parentElement.setAttribute("class","checkedbox");
              saveItem();
           }
           else{
              e.target.parentElement.setAttribute("class","checkbox");
              saveItem();
           }
    }
    else if(e.target.tagName=="I" && e.target.className=="bi bi-x"){
        cover.style.opacity = "0.7";
        cover.style.display = "block";
        let warningBox = document.createElement('div');
        warningBox.setAttribute("class","delConfirm");
        document.querySelector('body').appendChild(warningBox);
        
        let warnMessage = document.createElement('p');
        warnMessage.setAttribute("class","warning");
        warnMessage.innerText = "Delete this task?";
        warningBox.appendChild(warnMessage);
        
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute("id", "delete");
        deleteBtn.setAttribute("class","warnbtn");
        deleteBtn.innerText = "Delete";
        warningBox.appendChild(deleteBtn);

        let cancelbtn = document.createElement('button');
        cancelbtn.setAttribute("id","cancel");
        cancelbtn.setAttribute("class","warnbtn");
        cancelbtn.innerText = "Cancel";
        warningBox.appendChild(cancelbtn);

        cancelbtn.addEventListener('click',()=>{
            cancelbtn.parentElement.remove();
            cover.style.opacity = "0";
            cover.style.display = "none";
        })
        deleteBtn.addEventListener('click',()=>{
            e.target.parentElement.parentElement.remove();
            deleteBtn.parentElement.remove();
            cover.style.opacity = "0";
            cover.style.display = "none";
            saveItem();
        })
    }
    else if(e.target.tagName=="I" && e.target.className=="bi bi-pencil-square"){
        cover.style.opacity = "0.7";
        cover.style.display = "block";
        let editBox = document.createElement('div');
        editBox.setAttribute("class","editTask");
        document.querySelector('body').appendChild(editBox);

        let editTitle = document.createElement('p');
        editTitle.setAttribute("class","editHead");
        editTitle.innerText = "Edit Title";
        editBox.appendChild(editTitle);

        let editText = document.createElement('input');
        editText.setAttribute("type","text");
        editText.setAttribute("class","editText");
        editText.setAttribute("maxlength","40");
        editText.setAttribute("value",e.target.parentElement.parentElement.innerText);
        editBox.appendChild(editText);

        let doneBtn = document.createElement('button');
        doneBtn.setAttribute("class","doneBtn");
        doneBtn.innerText = "Done";
        editBox.appendChild(doneBtn);

        let editCancel = document.createElement('button');
        editCancel.setAttribute("class","editCancel");
        editCancel.innerText = "Cancel";
        editBox.appendChild(editCancel);

        editText.focus();

        editCancel.addEventListener('click',()=>{
            editCancel.parentElement.remove();
            cover.style.opacity = "0";
            cover.style.display = "none";
        })
        doneBtn.addEventListener('click',()=>{
            if(editText.value=='' || editText.value==' ')
                this.disabled = true;
            else{
                this.disabled = false;
                e.target.parentElement.parentElement.innerHTML = `${editText.value}<span class="editBtn"><i class="bi bi-pencil-square"></i></span>`;
                doneBtn.parentElement.remove();
                cover.style.opacity = "0";
                cover.style.display = "none";
                saveItem();
            }
        })
    }
})

function saveItem(){
    localStorage.setItem("Data",taskContainer.innerHTML);
}
function displayItem(){
    taskContainer.innerHTML = localStorage.getItem("Data");
}
displayItem();

