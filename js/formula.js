for (let i = 0; i < row; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [activecell,cellProp]=activeCell(address);
            let enteredData = activecell.innerText;
            // console.log(enteredData);
            if(enteredData === cellProp.value) return;
            cellProp.value = enteredData;
            // if data modifies remove relation and remove formula and update children with new value;
            removeChildFromParent(cellProp.formula);
            cellProp.formula="";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown",(e)=>{
    let inputFomula = formulaBar.value;
    if(e.key === "Enter" && inputFomula )
    {
        //if change in formula then break old relation and add new relation
        let address = addressBar.value;
        let [cell,cellProp] = activeCell(address);
        if(inputFomula !== cellProp.formula) removeChildFromParent(cellProp.formula);
        addChildToGraphComponent(inputFomula,address);
        // check formula is cyclic or not
        let isCyclic = isGraphCyclic();
        console.log(isCyclic);
        console.log(graphComponentMatrix);
        if(isCyclic === true)
        {
            alert("Your formula is creating a cycle so plz chnage");
            removeChildFromGraphComponent(inputFomula,address);
            return;
        }
        let evaluatedValue = evaluateFormula(inputFomula);
        setCellUIAndCellProp(evaluatedValue,inputFomula,address);
        addChildToParent(inputFomula);    
        updateChildrenCells(address);
        console.log(sheetDB);
    }
})

function removeChildFromGraphComponent(formula,childAddress) {
    let [crid,ccid] =decodeRowIDAndColIdFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue <=90)
        {
            let [prid,pcid]=decodeRowIDAndColIdFromAddress(encodedFormula[i]);
            
            graphComponentMatrix[prid][pcid].pop();
        }
    }    
}

function addChildToGraphComponent(formula,childAddress){
    let [crid,ccid] =decodeRowIDAndColIdFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue <=90)
        {
            let [prid,pcid]=decodeRowIDAndColIdFromAddress(encodedFormula[i]);
            
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        }
    }
}

function updateChildrenCells(parentAddress) {
    let [parentCell ,parentCellProp] = activeCell(parentAddress);
    let children = parentCellProp.children;
    // console.log(parentCellProp.children +" ",parentAddress);
    
    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell,childCellProp]=activeCell(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        console.log(evaluatedValue);
        console.log(childFormula);
        setCellUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);
    }

}

function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        
            let asciiValue = encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90)
            {
                let [cell,parentCellProp] = activeCell(encodedFormula[i]);
                parentCellProp.children.push(childAddress);   
               }   
    }
}

function removeChildFromParent(oldFormula) {
    let childAddress = addressBar.value;
    let encodedFormula = oldFormula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        
            let asciiValue = encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90)
            {
                let [cell,parentCellProp] = activeCell(encodedFormula[i]);
                let idx = parentCellProp.children.indexOf(childAddress);
                parentCellProp.children.slice(idx,1);
            }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        
            let asciiValue = encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90)
            {
                let [cell,cellProp] = activeCell(encodedFormula[i]);
                encodedFormula[i] = cellProp.value;
            }
        
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}
function setCellUIAndCellProp(evaluateValue,formula,address) {
    let [cell,cellProp]=activeCell(address);
    cell.innerText=evaluateValue;
    cellProp.value=evaluateValue;
    cellProp.formula=formula;
}