let row = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellCont = document.querySelector(".cells-cont")
let addressBar = document.querySelector(".address-bar");

let fontSizeProp = document.querySelector(".font-size-prop");
let fontFamilyProp = document.querySelector(".font-family-prop");

let fontFamilyArray =["serif","sans-serif","cursive","fantasy","monospace"];

fontFamilyArray.forEach(element => {
    option = document.createElement("option");
    option.setAttribute("value",element);
    option.innerText=element;
    fontFamilyProp.appendChild(option);
});

for (let i = 2; i < 26; i+=2) {
      
    option = document.createElement("option");
    option.setAttribute("value",i);
    option.innerText=i;
    fontSizeProp.appendChild(option);
}

for (let i = 0; i < row; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);   
}

for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);   
}

for (let i = 0; i < row; i++) {
    let  rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true")
        cell.setAttribute("spellcheck","false")
        // Attribute for cell identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);
    }
    cellCont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell,i,j) {
    cell.addEventListener("click",(e)=>{
        let rowId=i+1;
        let colId=String.fromCharCode(65+j);
        console.log(String.fromCharCode(65+j)+(i+1));
        addressBar.value=`${colId}${rowId}`        
    })
}

// By default click on first cell via DOM
let firstCell = document.querySelector(".cell");

firstCell.click();






