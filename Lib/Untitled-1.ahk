#NoEnv
#SingleInstance, Force
SendMode, Input
SetBatchLines, -1
SetWorkingDir, %A_ScriptDir%
Loop, Files, e:\*.addon
{ 
FileMove, %A_LoopFileLongPath%, %A_MyDocuments%\*.*, 1
;takeown /f <foldername> /r /d y
}