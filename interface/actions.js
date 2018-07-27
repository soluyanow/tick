var userSide = 1; //За кого играет пользователь
var compSide = 0; //За кого играет компьютер
var gameField = new Array(); //поле клеток
var gameOver = false; //Флаг окончания игры
var moveSide = userSide; //Кто сейчас ходит, первый всегда пользователь

window.onload = function() {
    startGame();
    setPlayerSides();
    buldGameField();
    movePlayers();
};

function startGame() {
    /*$.ajax({
        type: "POST",
        url: url,
        data: data,
        success: success,
        dataType: dataType
    });*/
}

function showMenu() {
    $('#gameMenuContainer').magnificPopup({
        items:
            {
                src: "<div class='gameMenu'><input type='submit' name='start' value='yes'></div>"
            },
        type: "inline"
    });
}

function sayToUser(message) {
    $("#gameResultContainer").html(message);
    $("#gameResultContainer").css("display", "block");
}

function drawCell()
{
    $.each(gameField, function(i, j) {
        $.each(j, function(k, v) {
            if (gameField[i][k] === 1) {
                $("#gamecell-" + i + "-" + k).html("<img src='/interface/x.png' />");
            } else if (gameField[i][k] === 0) {
                $("#gamecell-" + i + "-" + k).html("<img src='/interface/o.png' />");
            }
        });
    });

}

function setPlayerSides()
{
    userSide = Math.floor(Math.random() * 2);
    compSide = 1 - userSide;
    moveSide = userSide;
}

function buldGameField() {
    var rows = $.parseJSON($(".GameFieldDim").html()).height;
    var columns = $.parseJSON($(".GameFieldDim").html()).width;

    var arr = new Array();
    for(var i = 0; i < rows; ++i) {
        arr[i] = new Array();
        for(var j = 0; j < columns; ++j) {
            arr[i][j] = null;
        }
    }

    gameField = arr;
}

function checkGameOver(playerSide)
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

            if (selCellH >= (facet)) {
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

            if (selCellV >= facet) {
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

            if (selCellDL >= facet) {
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

            if (selCellDR >= facet) {
                gameOver = true;
                break;
            }
        }
    }

    return gameOver;
}

function makeMove(playerSide) {
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

function movePlayers() {
    var cellClass = "gamecell";
    $("."+cellClass).on("click", function () {
        var curMove = $.parseJSON($(this).attr("data"));

        if ((gameField[curMove.y][curMove.x] === null)) {

            //Ход игрока

            gameField[curMove.y][curMove.x] = moveSide;

            drawCell();

            if (checkGameOver(moveSide)) {
                sayToUser("Игрок победил");
                console.log("Игрок победил");
                gameOver = true;

                return gameOver;
            }

            (moveSide === 1) ? (moveSide = 0) : (moveSide = 1);

            //Ход компьютера

            var Point = makeMove(moveSide);

            if (Point !== false) {
                gameField[Point[0]][Point[1]] = moveSide;
            }

            drawCell();

            if (checkGameOver(moveSide)) {
                sayToUser("Компьютер победил");
                console.log("Компьютер победил");
                gameOver = true;

                return gameOver;
            }

            (moveSide === 1) ? (moveSide = 0) : (moveSide = 1);
        }

        console.log(gameField);
    });
}










