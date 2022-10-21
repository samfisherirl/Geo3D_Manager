SetWorkingDir, %A_ScriptDir%
#SingleInstance, force
#Include Json.ahk
loop, files, %A_AppDataCommon%\origin\*.ddc, R
  {
    FileRead, Json, %A_LoopFileFullPath%
    data := json_load(JSON)
    games .= data["ddInstanceData"]["packageRootPath"]

  }
  PF := "C:\Program Files" 
  ES := " (x86)"
  file := "\Steam\steamapps\libraryfolders.vdf"

  a64 := PF . File
  a86 := PF . ES . File


  if fileexist(a86) {
    FileRead, Json, %a86%
    data := json_load(JSON)
    games .= data["libraryfolders"]["path"]
  }