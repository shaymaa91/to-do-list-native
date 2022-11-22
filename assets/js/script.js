/* functions declerations****************************************************************** */
const renderList = (listToRender) => {
    let result = '';
    for (let i = 0; i < listToRender.length; i++) {
        result += `<div class="list">
                        <div class="list-details">
                            <div class="list-number">${listToRender[i].id}</div>
                            <div class="list-value">${listToRender[i].value}</div>
                        </div>

                        <div class="delete">
                            <i class="fa fa-times delete-icon" id=${listToRender[i].id} aria-hidden="true" onclick="removeFromList(id)"></i>
                        </div>
                </div>`;

    }
    listBody.innerHTML = listBody.innerHTML + result;

}

const addToLocalStorage = (listToAdd) => {
    const stringifiedList = JSON.stringify(listToAdd);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedList);
}

const addNewTask = () => {
    let inputVal = document.getElementById('input1').value;
    const len = todosArr.length;
    if (inputVal) {
        //push to the array and save to local storage
        todosArr.push({
            id: len + 1,
            value: inputVal
        });

        //add to local storage
        addToLocalStorage(todosArr);
        //render to the page the new stored items
        console.log('rendering...', todosArr);
        //clear the dom before render
        document.getElementById('todos').innerHTML = '';
        renderList(todosArr);

    }

    //clear the input after store it's value
    document.getElementById('input1').value = '';

}

const removeFromList = (id) => {
    //get stored items
    let storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //remove the target item    
    let newListAfterDelete = storedItems.filter((item) => { return item.id != id });

    newListAfterDelete = newListAfterDelete.map((item, index) => {
        item.id = index + 1
        return item
    });

    todosArr = newListAfterDelete;

    //resave the new items
    addToLocalStorage(todosArr);
    //rerender the dom
    //clear the dom before rerender
    document.getElementById('todos').innerHTML = '';
    renderList(todosArr);

}

/* code driver ************************************************************* */
//define general variables
let LOCAL_STORAGE_KEY = 'todolist';
let todosArr = [];
let storedList;
let listBody = document.getElementById('todos');
//check for stored todos on local storage at the first time page load 
//load from local storage and render to the page
storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
if (storedList) {
    todosArr = storedList;
    //call renderList function
    renderList(storedList);
}

