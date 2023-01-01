const MAIN_CELL_COLOR = 'yellow'
const ERROR_CELL_COLOR = "#c46e6e"
const CELL_HIGHLIGHT_COLOR = "#a9ce64"
const SODUKO = [
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null]
];
const BORDER_WIDTH = '3px';

const COMMAND_KEYS = [
    'Control', 
    'Enter', 
    'Shift', 
    'Tab', 
    'Alt', 
    'CapsLock', 
    'NumLock'
]

/*===============================================*/

var currentCell = 'c55';
var cellR = 4;
var cellC = 4;
var isError = false;
var count = 0;

/*===============================================*/

for(var i=1;i<10;i++) {
    ['3','6','9'].forEach((p)=>{
        if(p!='9')
            document.getElementById(('c'+i)+p).style.borderRightWidth = BORDER_WIDTH
        document.getElementById(('c'+p)+i).style.borderBottomWidth = BORDER_WIDTH
    })
}

const makeBGWhite = () => {
    for(var i=1;i<10;i++) {
        for(var j=1;j<10;j++)
        {
            const cellID = ('c'+i)+j;
            document.getElementById(cellID).style.background = "none"
        }
    }
}

const makeCurrent = (id) => {
    if(!isError)
        makeBGWhite();
    else 
    document.getElementById(currentCell).style.background = ERROR_CELL_COLOR
    currentCell = 'c'+id;
    cellR = currentCell[1]-1;
    cellC = currentCell[2]-1;
    if(!isError)
    HighLightCurrent();    
    else
    document.getElementById(currentCell).style.background = MAIN_CELL_COLOR
}

const HighLightCurrent = () => {
    for(var i=1;i<10;i++) {
        var cell = ('c'+i)+(cellC+1);
        document.getElementById(cell).style.background = CELL_HIGHLIGHT_COLOR
        cell = ('c'+(cellR+1))+i;
        document.getElementById(cell).style.background = CELL_HIGHLIGHT_COLOR
    }
    document.getElementById(currentCell).style.background = MAIN_CELL_COLOR
}

const makeError = () => {
    for(var i=1;i<10;i++) {
        for(var j=1;j<10;j++)
        {
            const cellID = ('c'+i)+j;
            document.getElementById(cellID).style.background = ERROR_CELL_COLOR
        }
    }
    document.getElementById(currentCell).style.background = MAIN_CELL_COLOR
    isError = true
}

makeCurrent((cellR+1)+""+(cellC+1))

const checkForError = () => {
    for(var i=0;i<9;i++){
        const checkR = []
        const checkC = []
        for(var j=0;j<9;j++)
        {
            if(SODUKO[i][j])
            {
                if(checkR.indexOf(SODUKO[i][j]) > -1)
                    return true;
                checkR.push(SODUKO[i][j])
            }
            if(SODUKO[j][i])
            {
                if( checkC.indexOf(SODUKO[j][i]) > -1 )
                    return true;
                checkC.push(SODUKO[j][i])
            }
        }
    }
    var pR = parseInt((cellR)/3);
    var pC = parseInt((cellC)/3);

    const vR = [pR*3, pR*3 + 1, pR*3 + 2]
    const vC = [pC*3, pC*3 + 1, pC*3 + 2]

    const checkBOX = []
    for(var i=0; i<3;i++){
        for(var j=0; j<3;j++){
            if(SODUKO[vR[i]][vC[j]])
            {
                if(checkBOX.indexOf(SODUKO[vR[i]][vC[j]]) > -1)
                    return true;
                checkBOX.push(SODUKO[vR[i]][vC[j]])
            }
        }
    }
    return false;
}

const getCount = () => {
    var cnt = 0;
    for(var i=0;i<9;i++)
        for(var j=0;j<9;j++)
            if(SODUKO[i][j])
                cnt++;
    return cnt;
}

window.addEventListener('keydown', (e) => {
    const val = e.key;
    console.log(val);
    if(COMMAND_KEYS.includes(val))
        return
    if(val == 'Backspace' || val == 'Delete')
    {
        document.getElementById('error').innerHTML = ""
        SODUKO[cellR][cellC] = null;
        document.getElementById(('c'+(cellR+1))+(cellC+1)).innerHTML = "";
    }
    else if(val == 'ArrowLeft' || val == 'ArrowRight' || val == 'ArrowUp' || val == 'ArrowDown')
    {
        document.getElementById('error').innerHTML = ""
        if(val == 'ArrowUp')
            cellR = (cellR-1+9)%9;
        else if(val == 'ArrowLeft')
            cellC = (cellC-1+9)%9;
        else if(val == 'ArrowDown')
            cellR = (cellR+1)%9;
        else if(val == 'ArrowRight')
            cellC = (cellC+1)%9;
        var cellCode = (cellR+1) + '' + (cellC+1);
        makeCurrent(cellCode)
        return;
    }
    else if(val >= 1 && val <= 9 )
    {
        document.getElementById('error').innerHTML = ""
        document.getElementById(('c'+(cellR+1))+(cellC+1)).innerHTML = val;
        SODUKO[cellR][cellC] = val;
    }
    else{
        document.getElementById('error').innerHTML = "Please Enter Valid Number"
    }
    var errorCheck = checkForError();
    if(isError !== errorCheck)
        makeBGWhite();
    isError = errorCheck;
    if(isError)
        makeError();
    else
        HighLightCurrent();
    count = getCount();
    if(count == 81 && !isError)
    {
        document.getElementById('success').innerHTML = "Congratulations! You Completed The SODUKO"
    }
    document.getElementById('count').innerHTML = count
})

checkForError();

const restartGame = () => {
    if(window.confirm("Are you sure you want to restart it?\nYour progress will be lost."))
    {
        window.location.reload();
    }
}