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

        $this->buldInterface($interface);

        echo $interface;
    }

    private function buldInterface(&$interface) {
        $arrayDims = array("height" => 3, "width" => 3);

        $gameCellIdentity   = "gamecell"; //идентификатор ячейки игрового поля
        $cellLineIdentity   = "line"; //строка с ячейками игрового поля
        $gameFieldDim       = "gamefielddim";

        $gridString         = "<div class='gamefield'>";
        for ($h = 0; $h < $arrayDims["height"]; ++$h) {
            $gridString .= "<div class='".$cellLineIdentity."'>";
            for ($w = 0; $w < $arrayDims["width"]; ++$w) {
                $curPoint = array("x" => $w, "y" => $h);
                $gridString .= "<div data='".json_encode($curPoint)."' class=".$gameCellIdentity." id='".$gameCellIdentity."-".$h."-".$w."'></div>";
            }
            $gridString .= "</div>";
        }
        $gridString .= "</div>";

        $interface = str_replace("{gamefield}", $gridString, $interface);
        $interface = str_replace("{gamefielddim}", json_encode($arrayDims), $interface);

        return $gridString;
    }

}
