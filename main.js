//
// ! Your Local LocalStorage >
//
//
// This was supposed to be another Test Sheet but it became the second RTC Project >
//
// NB : DOM Elements >

// Technical Elements >
const input = document.getElementById('input');
const uiContainer = document.getElementById('local-ui');
let selectedOption = document.getElementById('select').value;

// Data Type Buttons >
const itemButton = document.getElementById('item-icon');
const arrayButton = document.getElementById('array-icon');
const objectButton = document.getElementById('object-icon');

// Help Button >
const helpButton = document.getElementById('help-button');
const instructionsButton = document.getElementById('instruction-pop-buttons');

// UI console containers >
const ulContainer = document.getElementById('ul-lists');
const itemUList = document.getElementById('item-list');
const arrayUList = document.getElementById('array-list');
const objectUList = document.getElementById('object-list');

// UI Empty Message >
let emptyContentMessage = document.createElement('h3');

// Error Window >
const popContainer = document.getElementById('pop-container');
const titleErrorWindow = document.getElementById('nav-message');
const mainErrorMessage = document.getElementById('pop-message');

// Error Window Buttons >
const closingX = document.getElementById('closing-x');
const confirmMessage = document.getElementById('confirm-pop-buttons');
const cancelMessage = document.getElementById('cancel-pop-buttons');
const eraseAllMessage = document.getElementById('erase-pop-buttons');

// Sound Error Test >
const errorSound = document.getElementById('error-sound');

// NB : Functions >

// > Convert Data Type Function >

function checkTypeOfValue(value) {
  let booleanReturn = false;
  //
  if (/[0-9]/.test(value)) {
    value = parseInt(value);
  } else if (value === 'true') {
    return !booleanReturn;
  } else if (value === 'false') {
    return booleanReturn;
  }
  return value;
}

// > Function to Sort by Last Digit >

function sortByLastDigit(localStorage) {
  localStorage.sort((a, b) => {
    let lastDigitA = parseInt(a.match(/\d+$/));
    let lastDigitB = parseInt(b.match(/\d+$/));
    return lastDigitA - lastDigitB;
  });
}

// NB : Window onload => UI innerHTMLs >
// * The noDigit config needs to be implemented again because of the data picked up from the actual local storage => keys = 01,02...

// Event Listener>
window.addEventListener('load', rechargeUList);

function rechargeUList() {
  sortByLastDigit(globalKeys);
  globalKeys.forEach((element) => {
    let keyNoDigit = element.replace(/[0-9]|\s/g, '');
    let value = JSON.parse(localStorage.getItem(element));
    if (element.includes('Array')) {
      let valueArray = JSON.stringify(value).replace(/,/g, ', ');
      arrayUList.innerHTML += templateInject(keyNoDigit, valueArray);
    } else if (element.includes('Object')) {
      let valueObject = JSON.stringify(value)
        .replace(/"/g, '')
        .replace(/:/g, ' : ')
        .replace(/,/g, ', ');
      objectUList.innerHTML += templateInject(keyNoDigit, valueObject);
    } else {
      itemUList.innerHTML += templateInject(keyNoDigit, value);
    }
  });
  // UI Message Console >
  loadingBar();
  setTimeout(emptyStorageMessage, 2250);
  // Audio Preload
  errorSound.preload = 'auto';
}

// > Template User Input UI >

function templateInject(key, value) {
  return `
  <li>
  <h4>${key}</h4>
  <p>${value}</p>
  </li>`;
}

// > Closing Window Error >

// Event Listener>
closingX.addEventListener('click', closeWindowError);
confirmMessage.addEventListener('click', closeWindowError);
cancelMessage.addEventListener('click', closeWindowError);

function closeWindowError() {
  popContainer.style.display = 'none';
  document.querySelector('section').style.filter = 'none';
}

// > Error Sound >

function playSound() {
  errorSound.currentTime = 0;
  errorSound.volume = 0.2;
  errorSound.play();
}

// NB : Visual POPUPS Elements >

// > Empty Storage >
// ! Object.assign().. Merveilleux !

function emptyStorageMessage() {
  if (localStorage.length <= 0) {
    // Empty Message >
    emptyContentMessage.innerText = 'Your local storage is empty.';
    //
    uiContainer.style.height = '100px';

    // Applied Style Properties through DOM and Object.assign >
    Object.assign(emptyContentMessage.style, {
      fontSize: '2.5rem',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    });
    //
    ulContainer.append(emptyContentMessage);

    // Not empty >
  } else {
    emptyContentMessage.remove();
    uiContainer.style.height = '';
  }
}

// > Loading Bar  >

function loadingBar() {
  //
  const element = document.getElementById('myBar');
  const progressBar = document.getElementById('myProgress');
  const loadingText = document.getElementById('loading');

  // While Loading >
  itemUList.style.display = 'none';
  arrayUList.style.display = 'none';
  objectUList.style.display = 'none';

  // Thicker Container >
  uiContainer.style.height = '100px';

  //
  let width = 0;
  const id = setInterval(frame, 200);
  // Loading Bar >
  function frame() {
    if (width == 100) {
      clearInterval(id);
      progressBar.remove();
      itemUList.style.display = 'block';
      arrayUList.style.display = 'block';
      objectUList.style.display = 'block';
      //
      uiContainer.style.height = '';
    } else {
      width += 10;
      element.style.width = width + '%';
      //
    }
  }
  // Loading Text Dot >
  setInterval(dot, 600);
  function dot() {
    if (width == 100) {
      clearInterval(dot);
    } else {
      loadingText.innerHTML += '.';
    }
  }
}

// > Highlight Data List Selection  >

function highlightOption() {
  if (selectedOption === '') {
    itemUList.classList.remove('selected-ul');
    arrayUList.classList.remove('selected-ul');
    objectUList.classList.remove('selected-ul');
  } else if (selectedOption === 'item') {
    itemUList.classList.add('selected-ul');
    arrayUList.classList.remove('selected-ul');
    objectUList.classList.remove('selected-ul');
  } else if (selectedOption === 'array') {
    itemUList.classList.remove('selected-ul');
    arrayUList.classList.add('selected-ul');
    objectUList.classList.remove('selected-ul');
  } else if (selectedOption === 'object') {
    itemUList.classList.remove('selected-ul');
    arrayUList.classList.remove('selected-ul');
    objectUList.classList.add('selected-ul');
  }
}

// > Instructions Box >

const instructionsBox = document.getElementById('instructions-box');

instructionsButton.addEventListener('click', closeInstructionsBox);
helpButton.addEventListener('click', openInstructionsBox);

// Open >
function openInstructionsBox() {
  instructionsBox.style.transition = '';
  instructionsBox.style.opacity = '1';
  instructionsBox.style.zIndex = '9999';
  document.querySelector('body').style.backgroundColor = 'black';
  document.querySelector('body').style.backgroundImage = '';
  document.querySelector('section').style.filter = 'blur(10px)';
}

// Close >
function closeInstructionsBox() {
  instructionsBox.style.opacity = '0';
  instructionsBox.style.zIndex = '';
  instructionsBox.style.transition = 'none';
  document.querySelector('body').style.backgroundColor = '';
  document.querySelector('body').style.backgroundImage = '';
  document.querySelector('section').style.filter = '';
}

// NB : Keyboard Config >

// > Enter and Backspace Keys >
// ! PREVENT DEFAULT right after the KEYBOARD makes the same KEY usable again for a different purpose....!!! (ENTER for both ADD and Confirm on ERROR)

// Input
document.getElementById('input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addButton();
    event.preventDefault();
  } else if (event.key === 'Delete') {
    removeItem();
  } else if (event.key === 'Enter' && input.value === '') {
    input.classList.add('shakeItEmpty');
    setTimeout(function () {
      input.classList.remove('shakeItEmpty');
    }, 1000);
  }
});

// Window
// * document.activeElement !== <3
window.addEventListener('keydown', function (event) {
  if (document.activeElement !== input && event.key === 'Delete') {
    removeItem();
  }
});

// > Tab Key >

window.addEventListener('keydown', function (event) {
  if (event.key === 'Tab') {
    event.preventDefault();
  }
  if (selectedOption === '' && event.key === 'Tab') {
    itemButton.click();
  } else if (selectedOption === 'item' && event.key === 'Tab') {
    arrayButton.click();
  } else if (selectedOption === 'array' && event.key === 'Tab') {
    objectButton.click();
  } else if (selectedOption === 'object' && event.key === 'Tab') {
    itemButton.click();
  }
});

// > Escape key to Reload >

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    this.location.reload();
  }
});

// NB : Notes to self >

// ! The forEach method cannot be stopped with a .break keyword =>
// * : The try / throw new Error / catch made the loop exits as wished, booya!
// ! To have ALL the declaration of a function as a CallBack function, make the function() KEYWORD with NO NAME >
// * Literally spent 1 hour finding out why the counter would't sum..
// ! GLOBAL VARIABLE FOR COUNTING STUFF, DUUHH..!!
// ! Watchout for () in the addEventListener cause of self invoking..!

// NB : Global Variable >

// Local Storage Data Reference >
let globalKeys = Object.keys(localStorage);

// * The counter will be always up to date >
// ArrayLength = Index of all the 'Array' Items on the localStorage >
// + General Counter variable for output order sort >

// Array
let arrayLength = globalKeys.filter((element) => {
  return /Array/.test(element);
});

let counterArray = arrayLength.length;

// Object
let objectLength = globalKeys.filter((element) => {
  return /Object/.test(element);
});

let counterObject = objectLength.length;

// Item
let itemLength = globalKeys.filter((element) => {
  if (!element.includes('Array') && !element.includes('Object')) {
    return element;
  }
});

let counterItem = itemLength.length;

// NB : Looping Toggle Data buttons config >
// > Beautiful..

const buttonsLoop = document.getElementsByClassName('principal-icon-container');

// Pretty cool way to add same Event Listener to 3 different elements >
for (let i = 0; i < buttonsLoop.length; i++) {
  buttonsLoop[i].addEventListener('click', toggleFunction);
  buttonsLoop[i].addEventListener('click', highlightOption);
  buttonsLoop[i].addEventListener('click', function () {
    input.focus();
  });
}

// ! THIS = The actual clicked button ! >
// * The classList node is used to add a class and remove one, cannot do that with the ID for example; SO :

// * ID = getElement
// * CLASS = Style and select/remove element

function toggleFunction() {
  for (let i = 0; i < buttonsLoop.length; i++) {
    if (buttonsLoop[i] !== this) {
      buttonsLoop[i].classList.remove('active');
    } else {
      // Adding the class style and the select value >
      let valueAttribute = this.getAttribute('value');
      selectedOption = valueAttribute;
      this.classList.toggle('active');
    }
    if (!this.classList.contains('active')) {
      selectedOption = '';
    }
  }
}

// NB : Add Item >
// * outline : none on CSS makes the .focus() selection invisible!

// Event Listener >
document.getElementById('add-item').addEventListener('click', addButton);

// Add Item Function >
function addButton() {
  //
  let item = input.value;
  let itemArray = Array.from(item.split(','));

  // Empty Input Shake Animation >
  if (item === '') {
    input.classList.add('shakeItEmpty');
    setTimeout(function () {
      input.classList.remove('shakeItEmpty');
    }, 500);
    return;
  }

  // Empty Option Data Type ERROR WINDOW >
  if (selectedOption === '') {
    //
    popContainer.style.display = 'block';
    titleErrorWindow.innerText = 'Select Data Type ERROR';
    mainErrorMessage.innerText = 'Select data type.';
    document.querySelector('section').style.filter = 'blur(3px)';
    // Buttons >
    cancelMessage.style.display = 'none';
    confirmMessage.style.display = 'block';
    eraseAllMessage.style.display = 'none';
    // Audio
    playSound();
    // Confirm by pressing Enter
    confirmMessage.focus();
    confirmMessage.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        closeWindowError();
      }
    });
  }

  // Item Configuration >
  else if (selectedOption === 'item') {
    if (item.includes('=')) {
      // Original key split >
      let key = item.split('=')[0];
      let value = item.split('=')[1];
      // Variation name for outputs >
      let keyNoDigit = key.replace(/[0-9]|\s/g, '');
      let finalKey = `${item.split('=')[0]} ${counterItem}`;

      // Data Transform function >
      value = checkTypeOfValue(value.trim());

      // Insert Array to LS + Counter >
      counterItem++;
      window.localStorage.setItem(finalKey, JSON.stringify(value));

      // Insert Item to UI Item List>
      itemUList.innerHTML += templateInject(keyNoDigit, value);

      // Scroll Follow Pop Element >
      itemUList.lastElementChild.scrollIntoView();

      // Invalid Item Syntax ERROR WINDOW >
    } else {
      popContainer.style.display = 'block';
      titleErrorWindow.innerText = 'Syntax ERROR';
      mainErrorMessage.innerText = 'Invalid input format for "Item" option.';
      document.querySelector('section').style.filter = 'blur(3px)';
      // Buttons
      cancelMessage.style.display = 'none';
      confirmMessage.style.display = 'block';
      eraseAllMessage.style.display = 'none';
      // Audio
      playSound();
      // Confirm by pressing Enter
      confirmMessage.focus();
      confirmMessage.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          closeWindowError();
          input.focus();
        }
      });
      return;
    }

    // Array Configuration >
  } else if (selectedOption === 'array') {
    if (item.includes(',') && !item.includes(':')) {
      //
      let key = `Array ${counterArray}`;
      let value = [];
      //
      let keyNoDigit = key.replace(/[0-9]|\s/g, '');

      // Iteration >
      itemArray.forEach((indexValue) => {
        // Data Transform function >
        indexValue = checkTypeOfValue(indexValue.trim());

        // Insert Data into Array >
        value.push(indexValue);
      });

      // Insert Array to LS + Counter >
      counterArray++;
      window.localStorage.setItem(key, JSON.stringify(value));

      // Insert Item to UI Array List>
      // * Regular expressions are the best.. >

      let stringifiedValue = JSON.stringify(value);
      let finalValue = stringifiedValue.replace(/,/g, ', ');
      arrayUList.innerHTML += templateInject(keyNoDigit, finalValue);

      // Scroll Follow Pop Element >
      arrayUList.lastElementChild.scrollIntoView();

      // Invalid Array Syntax ERROR WINDOW >
    } else {
      popContainer.style.display = 'block';
      titleErrorWindow.innerText = 'Syntax ERROR';
      mainErrorMessage.innerText = 'Invalid input format for "Array" option.';
      document.querySelector('section').style.filter = 'blur(3px)';
      // Buttons
      cancelMessage.style.display = 'none';
      confirmMessage.style.display = 'block';
      eraseAllMessage.style.display = 'none';
      // Audio
      playSound();
      // Confirm by pressing Enter
      confirmMessage.focus();
      confirmMessage.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          closeWindowError();
          input.focus();
        }
      });
      return;
    }

    // Object Configuration >
  } else {
    let key = `Object ${counterObject}`;
    let value = {};
    //
    let keyNoDigit = key.replace(/[0-9]|\s/g, '');

    // Iteration >
    // Use of the itemArray because it is already splitted with the ',' so every item is a string who contains a ':' > split from there and take the first element as KEY and the second as VALUE >
    try {
      itemArray.forEach((indexPairValue) => {
        if (indexPairValue.includes(':')) {
          let keyPair = indexPairValue.split(':')[0];
          let valuePair = indexPairValue.split(':')[1];

          // Data Transform function >
          valuePair = checkTypeOfValue(valuePair.trim());

          // Insert Data into Object >
          value[keyPair.trim()] = valuePair;
        } else {
          throw new Error('Invalid input format for "Object" option.');
        }
      });

      // Insert Object to LS + Counter >
      counterObject++;
      window.localStorage.setItem(key, JSON.stringify(value));

      // Insert Item to UI Object List>
      let stringifiedValue = JSON.stringify(value);
      let finalValue = stringifiedValue
        .replace(/,/g, ', ')
        .replace(/:/g, ' : ')
        .replace(/"/g, '');
      objectUList.innerHTML += templateInject(keyNoDigit, finalValue);

      // Scroll Follow Pop Element >
      objectUList.lastElementChild.scrollIntoView();

      // Invalid Object Syntax ERROR WINDOW >
    } catch (error) {
      popContainer.style.display = 'block';
      titleErrorWindow.innerText = 'Syntax ERROR';
      document.querySelector('section').style.filter = 'blur(3px)';
      // Buttons
      cancelMessage.style.display = 'none';
      confirmMessage.style.display = 'block';
      eraseAllMessage.style.display = 'none';
      // Error Message
      mainErrorMessage.innerText = error.message;
      // Audio
      playSound();
      // Confirm by pressing Enter
      confirmMessage.focus();
      confirmMessage.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          closeWindowError();
          input.focus();
        }
      });
      return;
    }
  }
  // Reset input value >
  input.value = '';
  // UI Empty Storage Message >
  emptyStorageMessage();
}

// NB : Remove Last Item >

// * Only way to return the ELEMENTS that contains the regular expression is with the .filter and return of argument ELEMENT <3

// Event Listener >
document.getElementById('remove-item').addEventListener('click', removeItem);

// Remove Item Function >
// Using the globalKeys wouldn't correctly trigger the remove element one by one, idk why.. Had to do the same config as Global but locally in the function..?

// * setTimeout to remove the class with the animation after X time, is awesome.. Add class, animation appears, delete class right after => Repeat at each click <3

function removeItem() {
  // Another variable for global LS >
  let localKey = Object.keys(localStorage);

  // Sort + Data packs >
  sortByLastDigit(localKey);

  // Item Ref >
  let itemFinal = localKey.filter((element) => {
    if (!element.includes('Array') && !element.includes('Object')) {
      return element;
    }
  });

  // Array Ref >
  let arrayFinal = localKey.filter((element) => {
    return /Array/.test(element);
  });

  // Object Ref >
  let objectFinal = localKey.filter((element) => {
    return /Object/.test(element);
  });

  // Delete conditional STATEMENTS for each Selected DATA Type >
  if (selectedOption === 'array') {
    // Shake Animation >
    if (arrayFinal.length === 0) {
      arrayButton.classList.add('shakeItEmpty');
      setTimeout(function () {
        arrayButton.classList.remove('shakeItEmpty');
      }, 500);
      return;
    }
    localStorage.removeItem(arrayFinal[arrayFinal.length - 1]);
    arrayUList.lastElementChild.remove();
    if (counterArray >= 1) {
      counterArray--;
    }
  } else if (selectedOption === 'object') {
    if (objectFinal.length === 0) {
      objectButton.classList.add('shakeItEmpty');
      setTimeout(function () {
        objectButton.classList.remove('shakeItEmpty');
      }, 500);
      return;
    }
    localStorage.removeItem(objectFinal[objectFinal.length - 1]);
    objectUList.lastElementChild.remove();
    if (counterObject >= 1) {
      counterObject--;
    }
  } else if (selectedOption === 'item') {
    if (itemFinal.length === 0) {
      itemButton.classList.add('shakeItEmpty');
      setTimeout(function () {
        itemButton.classList.remove('shakeItEmpty');
      }, 500);
      return;
    }
    localStorage.removeItem(itemFinal[itemFinal.length - 1]);
    itemUList.lastElementChild.remove();
    if (counterItem >= 1) {
      counterItem--;
    }
    // Invalid Select Data DELETE ERROR WINDOW >
  } else {
    popContainer.style.display = 'block';
    titleErrorWindow.innerText = 'Data type Delete ERROR';
    mainErrorMessage.innerText = 'Select data type to Delete.';
    document.querySelector('section').style.filter = 'blur(3px)';
    // Buttons
    cancelMessage.style.display = 'none';
    confirmMessage.style.display = 'block';
    eraseAllMessage.style.display = 'none';
    // Audio
    playSound();
    // Confirm by pressing Enter
    confirmMessage.focus();
    confirmMessage.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        closeWindowError();
        input.focus();
      }
    });
  }
  // UI Empty Storage Message >
  emptyStorageMessage();
}

// NB : Remove All Items >
// ! Confirm Enter = .focus() + EventListener.. 2 days figuring out........ !

// Event Listener >
document
  .getElementById('remove-all-items')
  .addEventListener('click', popRemoveMessages);

// > Message Confirmation to Remove >

function popRemoveMessages() {
  if (localStorage.length === 0) {
    popContainer.style.display = 'block';
    titleErrorWindow.innerText = 'Empty Local Storage ERROR';
    mainErrorMessage.innerText = 'Nothing to remove.';
    document.querySelector('section').style.filter = 'blur(3px)';
    // Buttons
    cancelMessage.style.display = 'none';
    eraseAllMessage.style.display = 'none';
    confirmMessage.style.display = 'block';
    // Audio
    playSound();
    // Confirm by pressing Enter
    confirmMessage.focus();
    confirmMessage.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        closeWindowError();
      }
    });
  } else {
    popContainer.style.display = 'block';
    titleErrorWindow.innerText = 'WARNING!';
    mainErrorMessage.innerText = 'Are you sure you want to erase all data?';
    document.querySelector('section').style.filter = 'blur(3px)';
    // Buttons
    cancelMessage.style.display = 'block';
    confirmMessage.style.display = 'none';
    eraseAllMessage.style.display = 'block';
    //
    eraseAllMessage.addEventListener('click', function () {
      clearLocalStorage();
    });
  }
}

// > Clear LS Storage >

function clearLocalStorage() {
  localStorage.clear();
  emptyStorageMessage();
  itemUList.innerHTML = '';
  arrayUList.innerHTML = '';
  objectUList.innerHTML = '';
  counterArray = 0;
  counterObject = 0;
  counterItem = 0;
  closeWindowError();
}

// ******************************** ⬇ TESTING ZONE ⬇ ************************************* //

// > Console Button Test >

// const consoleButton = document.getElementById('console-test');

// consoleButton.addEventListener('click', triggerConsole);

// function triggerConsole() {
//   console.log(`Array counter : ${counterArray}`);
//   console.log(`Object counter : ${counterObject}`);
//   console.log(globalKeys);
//   console.log(`Item Array Reference :`, itemLength);
// console.log(firstItemKey);
// }
