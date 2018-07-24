<?php
class View
{
    private $data = array();

    function __construct()
    {
        $this->data = array();
    }

    public function showInterface()
    {
        $filename = $_SERVER["DOCUMENT_ROOT"]."/interface/interface.html";
        $interface = file_get_contents($filename);

        $grid = $this->buldGrid();
        $interface = str_replace("{gamefield}", $grid, $interface);

        echo $interface;
    }

    private function buldGrid($height = 3, $width = 3) {
        $gameCellIdentity   = "gamecell"; //идентификатор ячейки игрового поля для замены
        $clearCellIdentity  = "cell"; // идентификатор ячейки неигрового поля для замены
        $cellLineIdentity   = "line"; //строка с ячейками игрового поля
        $fieldLength        = 50; //размер стороны квадратного поля

        $gridString         = "<div class='gamefield'>";
        for ($h = 0; $h < $height; ++$h) {
            $gridString .= "<div class='".$cellLineIdentity."'>";
            for ($w = 0; $w < $width; ++$w) {
                $curPoint = array("x" => $w, "y" => $h);
                $gridString .= "<div data='".json_encode($curPoint)."' class=".$gameCellIdentity." id='".$gameCellIdentity."-".$h."-".$w."'></div>";
            }
            $gridString .= "</div>";
        }
        $gridString .= "</div>";

        return $gridString;
    }

}
