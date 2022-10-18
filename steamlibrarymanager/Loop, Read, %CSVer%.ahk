SetWorkingDir, %A_ScriptDir%
global CSVer:= A_ScriptDir "\WmiData.csv"
global steamlog := A_ScriptDir "\steam.txt"
Finder := []
Loop, Read, %CSVer%
{
  id:=A_Index
  loop, parse, A_LoopReadLine, `,
  {
    A:=[]
    A:=StrSplit(A_LoopField, "\")
    Loop, % A.Length() {
      if InStr(A[A_index], "steamapps") {

        Finder.Push(new Srch([A_LoopReadLine,A_LoopReadLine,id]))
        length := A_Index
      }
    }
  }
}
msgbox % finder.5.path()
class Srch {
  __New(stuff){
    global
    val:=[]
    val := StrSplit(stuff[1],",")
    this.names := val[1]
    this.paths := val[3]
    this.identity := stuff[3]
  }
  Name() {
    return this.names
  }
  Path() {
    return this.paths
  }
  ID(){
    return this.identity
  }
}