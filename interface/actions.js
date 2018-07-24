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
        // Размер грани n - для вертикали и горизонтали
        // Размер грани (n-1) - для диагонали справа налево
        // Размер грани (n+1) - для диагонали слева направо

        var gameOver = false;
        var facet = gameField.length; // размер грани поля

        var lineArray = new Array();
        for (var i = 0; i < gameField.length; ++i) {
            lineArray = lineArray.concat(gameField[i]);
        }

        for (i = 0; i < facet; ++i) {
            if (gameOver) {
                break;
            }

            var selCellH = 0;
            for (var j = 0; j < lineArray.length; ++j) {
                if (gameField[i][j] === playerSide) {
                    ++selCellH;
                }

                if (selCellH === (facet)) {
                    gameOver = true;
                    break;
                }
            }

            var selCellV = 0;
            var selColsV = 0;
            for (var j = i; j < lineArray.length; ++j) {
                if (((selColsV === 0) || (selColsV === facet)) && (lineArray[j] === playerSide)) {
                    selColsV = 0;
                    ++selCellV;
                }

                ++selColsV;

                if (selCellV === facet) {
                    gameOver = true;
                    break;
                }
            }

            var selCellDL = 0;
            var selColsDL = 0;
            for (var j = 0; j < lineArray.length; ++j) {
                if (((selColsDL === 0) || (selColsDL === (facet + 1))) && (lineArray[j] === playerSide)) {
                    selColsDL = 0;
                    ++selCellDL;
                }

                ++selColsDL;

                if (selCellDL === facet) {
                    gameOver = true;
                    break;
                }
            }

            var selCellDR = 0;
            var selColsDR = 0;
            for (var j = 0; j < lineArray.length; ++j) {
                if (((selColsDR === 0) || (selColsDR === (facet - 1))) && (lineArray[j] === playerSide)) {
                    selColsDR = 0;
                    ++selCellDR;
                }

                ++selColsDR;

                if (selCellDR === facet) {
                    gameOver = true;
                    break;
                }
            }
        }

        return gameOver;
    }

    static makeMove() {
        // Просматриваем массив слева-направо сверху-вниз
        // Находим пустой элемент массива
        // Просматриваем соседние элементы
        // Если есть заполненый элементы рядом, то заполняем ячейку значением игрока

        var facet = gameField.length; // размер грани поля

        var lineArray = new Array();
        for (var i = 0; i < gameField.length; ++i) {
            lineArray = lineArray.concat(gameField[i]);
        }

        var point = new Array();

        for (i = 0; i < facet; ++i) {
            if (point.length > 0) {
                break;
            }

            for (j = 0; j < lineArray.length; ++j) {
                if (gameField[i][j] === null) {
                    point[0] = i;
                    point[1] = j;
                    break;
                }

                if (gameField[i][j] !== null) {

                }

            }

        }

    }


    static movePlayers() {
        var cellClass = "gamecell";

        $("."+cellClass).on("click", function () {
            var curMove = $.parseJSON($(this).attr("data"));

            if ((gameField[curMove.y][curMove.x] === null)) {
                //Ход игрока
                gameField[curMove.y][curMove.x] = 1;

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









