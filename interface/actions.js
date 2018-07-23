let userSide = 1; //За кого играет пользователь
let compSide = 0; //За кого играет компьютер
let gameField = new Array(); //поле клеток

let gameOver = false; //Флаг окончания игры

let moveSide = userSide; //Кто сейчас ходит, первый всегда пользователь

window.onload = function() {
    gA = new GameActions();
    userSide = gA.setPlayerSides();
    compSide = 1 - userSide;
    moveSide = userSide;

    gameField = gA.buldGameField(3,3);

    sA = new SystemActions();
    sA.setSystemHandlers();


};

class SystemActions
{
    constructor() {
        this.cellClass = "gamecell";
    }

    setSystemHandlers() {
        $("."+this.cellClass).on("click", function () {
            var curMove = $.parseJSON($(this).attr("data"));

            if (gameField[curMove.y - 1][curMove.x - 1] === null) {
                moveSide = !moveSide;
                gameField[curMove.y - 1][curMove.x - 1] = moveSide ? 1 : 0;
            }

            console.log(gameField);
        });
    }
}

class GameActions
{
    setPlayerSides()
    {
        let max = 1;
        let min = 0;

        return Math.floor(Math.random() * (max-min + 1) + min);
    }

    buldGameField(rows, columns) {
        var arr = new Array();
        for(var i = 0; i < rows; ++i){
            arr[i] = new Array();
            for(var j = 0; j < columns; ++j){
                arr[i][j] = null;
            }
        }
        return arr;
    }



}








