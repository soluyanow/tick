let userSide = 1; //За кого играет пользователь
let compSide = 0; //За кого играет компьютер
let gameField = new Array(); //поле клеток

let gameOver = false; //Флаг окончания игры

let moveSide = userSide; //Кто сейчас ходит, первый всегда пользователь

window.onload = function() {
    /*gA = new GameActions();
    userSide = gA.setPlayerSides();
    compSide = 1 - userSide;
    moveSide = userSide;
    gameField = gA.buldGameField(3,3);
    gA.movePlayers();*/

    userSide = GameActions.setPlayerSides();
    compSide = 1 - userSide;
    moveSide = userSide;
    gameField = GameActions.buldGameField(3,3);
    GameActions.movePlayers();

    console.log(moveSide);

};

class GameActions
{
    static setPlayerSides()
    {
        var max = 1;
        var min = 0;

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static buldGameField(rows, columns) {
        var arr = new Array();
        for(var i = 0; i < rows; ++i){
            arr[i] = new Array();
            for(var j = 0; j < columns; ++j){
                arr[i][j] = null;
            }
        }
        return arr;
    }

    static doMove(columns, rows) {
        var point = new Array();

        for (var h = 0; h < rows; ++h) {
            for (var w = 0; w < columns; ++w) {
                if (gameField[h][w] === null) {
                    point[0] = h;
                    point[1] = w
                }
            }
        }

        if (point.length > 0) {
            return point;
        }
        return false;
    }

    static checkGameOver(playerSide)
    {
        var gameOver = false;

        //Горизонтали
        var i = 0;
        var countMoves = 0;
        while (typeof(gameField[i]) !== "undefined") {
            countMoves = 0;
            if (gameOver === true) {
                break;
            }

            for (var j = 0; j < gameField[i].length; ++j) {
                if (gameField[i][j] === playerSide) {
                    ++countMoves;
                }

                if (countMoves === gameField[i].length) {
                    gameOver = true;
                    break;
                }
            }

            ++i;
        }


        var lineArray = new Array();
        for (var i = 0; i < gameField.length; ++i) {
            lineArray = lineArray.concat(gameField[i]);
        }

        //Диагоняль лево-низ
        var countMoves = 0;
        for (var j = 0; j <= lineArray.length; ++j) {
            if (((j % (gameField.length + 1)) === 0) && (lineArray[j] === playerSide)) {
                ++countMoves;
                if (countMoves === gameField.length) {
                    gameOver = true;
                    break;
                }
            }
        }

        //Диагональ право-низ
        var countMoves = 0;
        var count = 0;
        var j = 0;
        for (var j = (gameField.length - 1); j < lineArray.length; ++j) {
            if ((j === (gameField.length - 1)) && (lineArray[j] === playerSide)) {
                ++countMoves;
            }

            if ((count === gameField.length - 1) && (lineArray[j] === playerSide)) {
                ++countMoves;
                count = 0;
            }

            ++count;

            if (countMoves === gameField.length) {
                gameOver = true;
                break;
            }
        }

        //Вертикали
        var countMoves = 0;
        var count = 0;
        for (var j = 0; j < (lineArray.length); ++j) {
            if (gameOver === true) {
                break;
            }
            count = 0;
            for (var i = j; (i < lineArray.length); ++i) {
                if ((count === (gameField.length) || count === 0) && (lineArray[i] === playerSide)) {
                    ++countMoves;
                    count = 0;
                }
                ++count;

                if (countMoves === gameField.length + 1) {
                    gameOver = true;
                    break;
                }
            }
        }

        return gameOver;
    }


    static movePlayers() {
        var cellClass = "gamecell";

        $("."+cellClass).on("click", function () {
            var curMove = $.parseJSON($(this).attr("data"));

            if ((gameField[curMove.y][curMove.x] === null)) {
                //Ход игрока
                gameField[curMove.y][curMove.x] = moveSide ? userSide : compSide;

  /*              moveSide = !moveSide;

                //Ход компьютера
                var point = GameActions.doMove(3,3);
                if (point !== false) {
                    gameField[point[0]][point[1]] = moveSide ? userSide : compSide;

                }
                moveSide = !moveSide;*/
            }

            if (GameActions.checkGameOver(1)) {
                console.log("Игрок подебил");
            }


            console.log(gameField);
        });
    }
}









