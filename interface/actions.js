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

    static makeMove(playerSide) {
        // Просматриваем массив слева-направо сверху-вниз
        // Находим пустой элемент массива
        // Просматриваем соседние элементы
        // Обходим по кругу элементы, расположенные рядом с найденным, учитывая границы

        var PointArr = new Array(); //Координаты точки, куда сделать ход 0 - x, 1 - y
        var facet = gameField.length;

        var fieldClear = true;

        for (var i = 0; i < facet; ++i) {
            if (!fieldClear) {
                break;
            }
            for (var j = 0; j < facet; ++j) {
                if (gameField[i][j] === playerSide) {
                    fieldClear = false;
                }
            }
        }

        if (fieldClear) {
            for (var i = 0; i < facet; ++i) {
                if (PointArr.length > 0) {
                    break;
                }
                for (var j = 0; j < facet; ++j) {
                    if (gameField[i][j] === null) {
                        PointArr[0] = i;
                        PointArr[1] = j;
                        break;
                    }
                }
            }

            return PointArr;
        }

        if (!fieldClear) {
            for (var i = 0; i < facet; ++i) {
                if (PointArr.length > 0) {
                    break;
                }

                for (var j = 0; j < facet; ++j) {
                    if (gameField[i][j] === playerSide) {
                        if (i === 0) { //верх
                            if (j === 0) {
                                if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i + 1][j + 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                }
                            } else if ((j > 0) && (j < (facet - 1))) {
                                if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j - 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i + 1][j + 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                }
                            } else if (j === (facet - 1)) {
                                if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j - 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                }
                            }
                        } else if ((i > 0) && (i < (facet - 1))) {
                            if (j === 0) {
                                if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i - 1][j + 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i + 1][j + 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                }
                            } else if ((j > 0) && (j < (facet - 1))) {
                                if (gameField[i - 1][j - 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j - 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i + 1][j + 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i - 1][j + 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j;
                                    break;
                                }
                            } else if (j === (facet - 1)) {
                                if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i - 1][j - 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j - 1] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i + 1][j] === null) {
                                    PointArr[0] = i + 1;
                                    PointArr[1] = j;
                                    break;
                                }
                            }
                        } else if (i === (facet - 1)) {
                            if (j === 0) {
                                if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i - 1][j + 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                }
                            } else if ((j > 0) && (j < (facet - 1))) {
                                if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i - 1][j - 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j;
                                    break;
                                } else if (gameField[i - 1][j + 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j + 1;
                                    break;
                                } else if (gameField[i][j + 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                }
                            } else if (j === (facet - 1)) {
                                if (gameField[i][j - 1] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i - 1][j - 1] === null) {
                                    PointArr[0] = i - 1;
                                    PointArr[1] = j - 1;
                                    break;
                                } else if (gameField[i - 1][j] === null) {
                                    PointArr[0] = i;
                                    PointArr[1] = j + 1;
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (PointArr.length === 0) {
                for (var j = 0; j < facet; ++j) {
                    if (typeof(gameField[i]) !== "undefined") {
                        PointArr[0] = i;
                        PointArr[1] = j;
                        break;
                    }
                }

                return PointArr;
            }
        }

        if (PointArr.length > 0 ){
            return PointArr;
        }

        return false;
    }


    static movePlayers() {
        var u = userSide;
        var c = compSide;

        if (gameOver === true) {
            console.log("Игра окончена!");
        }

        var cellClass = "gamecell";

        $("."+cellClass).on("click", function () {
            var curMove = $.parseJSON($(this).attr("data"));

            if ((gameField[curMove.y][curMove.x] === null)) {
                //Ход игрока

                gameField[curMove.y][curMove.x] = moveSide;

                if (GameActions.checkGameOver(moveSide)) {
                    console.log("Игрок подебил");
                    gameOver = true;

                    return gameOver;
                }

                // Ход переходит к компьютеру
                (moveSide === 1) ? (moveSide = 0) : (moveSide = 1);

                //Ход компьютера

                var Point = GameActions.makeMove(moveSide);

                if (Point !== false) {
                    gameField[Point[0]][Point[1]] = moveSide;
                }

                if (GameActions.checkGameOver(moveSide)) {
                    console.log("Компьютер подебил");
                    gameOver = true;

                    return gameOver;
                }

                // Ход переходит к игроку
                (moveSide === 1) ? (moveSide = 0) : (moveSide = 1);
                var point = false;
            }


            console.log(gameField);
        });
    }
}









