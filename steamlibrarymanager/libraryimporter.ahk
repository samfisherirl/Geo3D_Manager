SetWorkingDir, %A_ScriptDir%
#SingleInstance, force
#Include Json.ahk

ea:=[]
j := new Jton("") 
;parse origin library json
loop, files, %A_AppDataCommon%\origin\*.ddc, R
{
  FileRead, Json, %A_LoopFileFullPath%
  data := json_load(Json)
  ea.Push(data["ddInstanceData"]["packageRootPath"])
} 
j.itemize(ea)
/*
;parse steam library json
if fileexist(J.86()) { ; Test for steam
  ;location if in Program Files (x86) vs null
  ;j := new Jton(Jton.a86())
  msgbox % J.steam()
  data := json_load(Json)
  ea .= data["libraryfolders"]["path"]
  ea .= "`n"
}
if fileexist(J.a86())
{
  FileRead, Json, % J.a64()
  data := json_load(Json)
  ea .= data["libraryfolders"]["path"]
  ea .= "`n"
}
*/
addy := []
val:=j.steam()
games:=j.origin()
j.itemize(val)


Class Jton ;parse steam library and origin
{
  __New(ar) {
    global
    this.file := ar
    this.dat := "C:\Program Files (x86)\Steam\steamapps\libraryfolders.vdf"
    this.dater := "C:\Program Files (x86)\Steam\steamapps\libraryfolders.json"
    ; test for program 86 vs 64 steam
    fileread, store, % ar
    this.data := store
    loop, files, %A_AppDataCommon%\origin\*.ddc, R
    {
      FileRead, Json, %A_LoopFileFullPath%
      data := json_load(Json)
      val.Push(data["ddInstanceData"]["packageRootPath"])
    }
    this.origins := val
    this.programfile := "C:\Program Files"
    this.quotes := `""""
    this.eightsix := " (x86)"
    this.libvdf := "\Steam\steamapps\libraryfolders.vdf"
  }
  a64()
  {
    a64 := this.programfile . this.libvdf
    return, a64
  }
  a86() {
    a86 := this.programfile . this.eightsix . this.libvdf
    return, a86
  }
  steam() { 
    val:=[]
    ;filecopy, this.dat, this.dater
    loop, read, % this.dat
    {
      if instr(A_LoopReadLine, "path")
      {
        value:=StrSplit(A_LoopReadLine, `"""")
        for i, v in value
        {
          if instr(v, ":\")
            val.Push(StrReplace((trim(value[i])), "\\" , "\"))
        }
        ;val.Push(StrReplace((trim(value[4])), "\\" , "\"))
        ;ea.Push(trim(val))
        ;ea.Push((StrReplace(line[A_Index], "\\", "\")))
      } ;msgbox, %msg%
    }
    each:=Jton.steamgames(val)
    return, each
  }
  origin() {
    Jton.itemize(this.origins)
    return this.origins
  }
  steamgames(val) {
    addy:=[]
    for i, v in val
    {
      Loop, Files, %v%\steamapps\common\*.*, D
        addy.Push(A_LoopFileLongPath) 
    }
    jton.itemize(addy)
    return addy
  }
  itemize(val) {
    for i, v in val
      fileappend, %v%`n, log.txt
  } 
}