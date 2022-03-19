// Stroage -> 2D matrix
let graphComponentMatrix = [];

for (let i = 0; i < row; i++) {
   let row = [];
   for (let j = 0; j < cols; j++) {   
        // More than 1 child relation 
        row.push([]);
   }     
   graphComponentMatrix.push(row);
}


function isGraphCyclic() {
    let visited = [];
    let dfsVisited =[];
    for (let i = 0; i < row; i++) {
        let row=[];
        for (let j = 0; j < cols; j++) {   
            row.push(false);
        }     
        visited.push(row);
        dfsVisited.push(row);
     }
     
     for (let i = 0; i < row; i++) {
        for (let j = 0; j < cols; j++) {
            if(visited[i][j] === false)   { 
                if(dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsVisited) === true){
                    return true;
                }
            }
        
        }
         
     }
     return false;
}
function dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsVisited) {
    visited[i][j]=true;
    dfsVisited[i][j]=true;

    for (let children = 0; children < graphComponentMatrix[i][j].length; children++) {
        let [crid,ccid] = graphComponentMatrix[i][j][children];
        if(visited[crid][ccid] === false)
        {
            if(dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited) === true)
            {
                return true;
            }
        }
        else if(dfsVisited[crid][ccid] === true && visited[crid][ccid] === true){
                
            return true;
        }
    }

    dfsVisited[i][j]=false;
    return false;
}