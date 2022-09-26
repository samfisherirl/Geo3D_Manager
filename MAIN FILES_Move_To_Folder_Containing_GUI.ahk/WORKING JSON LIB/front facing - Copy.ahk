setworkingdir, %A_ScriptDir%
#Include Json.ahk
#Include class.ahk
global gh_repo = "Flugan/Geo3D-Release"
;https://www.autohotkey.com/boards/viewtopic.php?f=6&t=92320&hilit=json
#SingleInstance, force
#NoEnv
urll := "https://api.github.com/repos/" gh_repo "/releases/latest" 
UrlDownloadToFile,%urll%, 2.json 
 
q := `""""

/*
Loop, read, 2.json
{
    line := []
line := StrSplit(A_LoopReadLine, q)
for index, value in line
{
    line2 := line[index]
    if InStr(line2, "http") and Instr(Line2, ".zip")
    msgbox % line2
}
}
 
*/
FileRead, JEW, 2.json

 
data := json_load(JEW)
msgbox % data["assets"][1]["browser_download_url"]
;loop % obj["assets"]

for index, value in data
lines .= data.index "`n" index "`n" value
msgbox % lines 
; for index, value in obj
;MsgBox % value "`n" obj[index] "`n" index



J := A_ScriptDir "\1.json"
FileRead, JEW, %J%
;obj := JSON.Load(JEW)
;Git1 := new Github(gh_repo)
;msgbox % Git1.getDL()
;msgbox % Git1.getString()
 
/*
for index, value in obj
MsgBox % obj[1].assets.browser_download_url


Loop, 3
{ 
    a:=[]
    a:=["a","b","c"]
    Game%A_Index% := new Games(a)
    indx++
}
 

msgbox % Game1.getPath()
