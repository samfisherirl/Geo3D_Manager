setworkingdir, %A_ScriptDir%
#Include Json1.ahk

#NoEnv
J := A_ScriptDir "\Jew.json"
FileRead, JEW, %J%
obj := JSON.Load(JEW)
for index, value in obj
MsgBox % obj[3].Game_Name