﻿; Generated by AutoGUI 2.5.8
#SingleInstance Force
#NoEnv
SetWorkingDir %A_ScriptDir%
SetBatchLines -1

Gui Color, 0x000000
Gui Add, Button, gGO x192 y104 w80 h21, GO-BABY-GO
Gui Add, Edit, vUSER x16 y24 w120 h16
Gui Add, Text, x192 y24 w120 h16 +0x200, Username
Gui Add, Edit, vREPO x16 y64 w120 h16
Gui Add, Text, x192 y64 w120 h16 +0x200, Repo (no spaces)

Gui Show, w351 h148, Download Latest Git Release
Return

GO:
Return

GuiEscape:
GuiClose:
    ExitApp