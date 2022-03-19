// Stroage
let sheetDB = [];

for (let i = 0; i < row; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      BGcolor: "#ecf0f1",
      value:"0",
      formula:"",
      children:[]
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
// let adressBar = document.querySelector(".address-bar")

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of 2 way binding
// Attach property listeners

function activeCell(address) {
  let [rid, cid] = decodeRowIDAndColIdFromAddress(address);
  // Access cell & storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);

  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRowIDAndColIdFromAddress(address) {
  let rowId = Number(address.slice(1)) - 1;
  let colId = Number(address.charCodeAt(0)) - 65;
  return [rowId, colId];
}

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modification
  cellProp.italic = !cellProp.italic; //Data change
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; //UI change
});
underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modification
  cellProp.underline = !cellProp.underline; //Data change
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; //UI change
});
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modification
  cellProp.bold = !cellProp.bold; //Data change
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; //UI change
});
fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});
BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  cellProp.BGcolor = BGcolor.value;
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    // let alignValue = e.target.classList[0];
    let alignvalue = alignElem.classList[0];
    cellProp.alignment = alignvalue;
    cell.style.textAlign = alignvalue;
    switch (alignvalue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  attachCellProperties(allCells[i]);
}

function attachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRowIDAndColIdFromAddress(address);
    let cellProp = sheetDB[rid][cid];
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.fontSize = cellProp.fontSize;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGcolor;


    italic.style.backgroundColor = cellProp.italic? activeColorProp: inactiveColorProp; //UI change
    bold.style.backgroundColor = cellProp.bold? activeColorProp: inactiveColorProp; //UI change
    underline.style.backgroundColor = cellProp.underline? activeColorProp: inactiveColorProp; //UI change
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    fontFamily.value = cellProp.fontFamily;
    fontSize.value = cellProp.fontSize;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
     let formulaBar = document.querySelector(".formula-bar");
     formulaBar.value = cellProp.formula;
     cellvalue = cellProp.value;
    });
}
