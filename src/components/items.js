import { Firestore, doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase-config';

const statusTexts = ['out', 'running low', 'In Stock'];
function items(name, status) {
    status = Number(status);
    // Create the container div
    const container = document.createElement('div');
    container.className = 'item-container';

    // Create and append the item name element
    const nameElement = document.createElement('h3');
    nameElement.textContent = name;
    container.appendChild(nameElement);

    // Create and append the item status element
    const statusElement = document.createElement('p');
    statusElement.textContent = `Status: ${statusTexts[status]}`;
    container.appendChild(statusElement);
    
    //Dropdown for status change
    const label = document.createElement('label');
    label.setAttribute('for', name);
    container.appendChild(label);

    const select = document.createElement('select');
    select.setAttribute('name', name);
    select.setAttribute('id', name);


    //options
    statusTexts.forEach((statusText, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = statusText;
        if(index === status) {
            option.selected = true;
        }
        select.appendChild(option);
    })
        select.addEventListener('change', (event) => {
            updateItem(name, event.target.value);
            location.reload();
        });

        container.appendChild(select);


    return container;

}

async function updateItem(key, status) {
    var num = parseInt(status);
    // switch(status) {
    //   case "Good":
    //     num = 2;
    //     break;
    //   case "Low":
    //     num = 1;
    //     break;
    //   case "Out":
    //     num = 0;
    //     break;
    //   default:
    //     num = 0;
        // console.log("Something went wrong");
    // }
    const groupCol = collection(db, 'rooms');
    const docPath = doc(groupCol, 'mDo2PQQxBxgVzdK43FMA/contents/items');
    const snapshot = await getDoc(docPath);
    if(snapshot.exists()) {
      const itemData = {
        [key]: [num],
      };
      updateDoc(docPath, itemData);
    }
}

export default items;