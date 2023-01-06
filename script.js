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
const START_CELL = 'c55';
const DIFFICULTY = ['Easy', 'Medium', 'Hard']

const COMMAND_KEYS = [
    'Control', 
    'Enter', 
    'Shift', 
    'Tab', 
    'Alt', 
    'CapsLock', 
    'NumLock'
]

BG_COLORS = ['rgba(51,51,51,0.3)','white']
PAUSE_RESUME_COMMAND = ["Resume", "Pause"]

const CELLS_FILLED_UTIL = [45, 35, 25]

/*===============================================*/

var GAME_RUN = false
var chosenDifficulty = 0
var currentCell = START_CELL;
var cellR = START_CELL[1] - 1;
var cellC = START_CELL[2] - 1;
var isError = false;
var count = 0;
var cellsToBeFilled = CELLS_FILLED_UTIL[chosenDifficulty];
const selectedCells = []

var sodukoBG = document.getElementById('sudoku-bg')
var pauseResumeBtn = document.getElementById('pause-resume')
var restartBtn = document.getElementById('restart')

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

    if(!GAME_RUN)
    {
        if('c'+id != START_CELL)
            return;
    }
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

const priorityCells = () => {
    selectedCells.forEach((cell) => {

    })
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
    for(var ii = 0; ii < 3 ; ii++)
    {
        var pR = ii;
        for(var jj = 0; jj < 3; jj++)
        {
            var pC = jj;

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
    if(!GAME_RUN)
        return;
    var reserved = false;
    if(selectedCells.indexOf(cellR*9+cellC) > -1)
        reserved = true;
    const val = e.key;
    if(COMMAND_KEYS.includes(val))
        return
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
    else if(reserved)
        return;
    else if(val == 'Backspace' || val == 'Delete')
    {
        document.getElementById('error').innerHTML = ""
        SODUKO[cellR][cellC] = null;
        document.getElementById(('c'+(cellR+1))+(cellC+1)).innerHTML = "";
    }
    else if(val >= 1 && val <= 9 )
    {
        document.getElementById('error').innerHTML = ""
        document.getElementById(('c'+(cellR+1))+(cellC+1)).innerHTML = val;
        SODUKO[cellR][cellC] = (val - 1) + 1;
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
        GAME_RUN = false
    }
    document.getElementById('count').innerHTML = count

    console.log(SODUKO)
})

const restartGame = () => {
    if(window.confirm("Are you sure you want to restart it?\nYour progress will be lost."))
    {
        window.location.reload();
    }
}

/* ===================== */
document.getElementsByName('difficulty').forEach(function(chk){
    chk.addEventListener('click', function() {
        if(this.checked){
        chosenDifficulty = this.value;
        // console.log('DIFFICULTY', DIFFICULTY[chosenDifficulty])
        }
    });
});

const deactivateForm = () => {
    document.getElementsByName('difficulty').forEach(function(chk){
        chk.disabled = true
    });
    document.getElementById("submit-btn").disabled = true
    document.getElementById("difficulty-form").style.color = 'grey'
}

const setDifficulty = (difficulty) => {
    const difficultyTag = document.getElementById("diff")
    difficultyTag.innerHTML = `(${difficulty})`

    cellsToBeFilled = CELLS_FILLED_UTIL[chosenDifficulty];

}

const selectCells = () => {
    const selectedCells_t = []
    while(selectedCells_t.length !== cellsToBeFilled)
    {
        const data = (parseInt(Math.random() * (81 + 5)))%81;
        if(selectedCells_t.indexOf(data) === -1)
            selectedCells_t.push(data)
    }
    return selectedCells_t;
}

const fillCells = (selectedCells_t) => {
    for(var j=0;j<selectedCells_t.length;j++){
        const data = selectedCells_t[j];
        const r = parseInt(data/9);
        const c = data%9;
        var val = -1;
        for(var i=1; i < 10 ; i++) {
            SODUKO[r][c] = i;
            // console.log(i)
            if(!checkForError())
            {
                val = i;
                break;
            }
        }
        if(val !== -1)
        {
            SODUKO[r][c] = val;
            const cellId = 'c'+(r+1)+''+(c+1);
            document.getElementById(cellId).innerHTML = val;
            document.getElementById(cellId).style.fontWeight = "bolder"
            document.getElementById(cellId).style.background = "grey!important"
            selectedCells.push(data);
        }
        else SODUKO[r][c] = null;
    }
}

const initBoard = () => {
    const selectedCells_t = selectCells();
    // console.log(selectedCells_t);
    fillCells(selectedCells_t);
}

var form = document.getElementById("difficulty-form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    GAME_RUN = true;
    setDifficulty(DIFFICULTY[chosenDifficulty]);
    deactivateForm();
    sodukoBG.style.backgroundColor = 'white'
    restartBtn.style.display = 'block';
    pauseResumeBtn.style.display = 'block';

    initBoard();
});

const pauseGame = () => {
    GAME_RUN = true^GAME_RUN;
    sodukoBG.style.backgroundColor = BG_COLORS[GAME_RUN]
    pauseResumeBtn.innerText = PAUSE_RESUME_COMMAND[GAME_RUN];
}