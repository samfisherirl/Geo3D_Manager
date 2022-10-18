SetWorkingDir, %A_ScriptDir%
global CSVer:= A_ScriptDir "\WmiData.csv"
global steamlog := A_ScriptDir "\steam.txt"
steam.show()
steam.pop()
Class steam
{
  show() {
    global
    Gui, Add, ListView, r20 w700 y100 gMyListView, Name|ID
    Gui Add, Edit, vSearch x16 y8 w220 h21,
    ; Gather a list of Finder names from a folder and put them into the ListView:
    Finder:=[]
    MyListView:
    if (A_GuiEvent = "DoubleClick")
    {
      LV_GetText(RowText, A_EventInfo) ; Get the text from the row's first field.
      ToolTip You double-clicked row number %A_EventInfo%. Text: "%RowText%"
    }
    ; For sorting purposes, indicate that column 2 is an integer.

    SetTimer, Find, 100
    ; Display the window and return. The script will be notified whenever the user double clicks a row.
    Gui, Show
  return

  find:
    steam.find()
  return

  GuiEscape:
  Exitapp
  }
    pop() {
      Loop, Read, %CSVer%
      {
        loop, parse, A_LoopReadLine, `,
        {
          A:=StrSplit(A_LoopField, "\")
          Loop, % A.Length() {
            if InStr(A[A_index], "steamapps") {
              Finder.Push(new Srch([A_LoopReadLine,A_LoopReadLine,A_Index]))
              LV_Add("", A_LoopReadLine, A_Index)
              length := A_Index
            }
          }
        }
      }
      
    LV_ModifyCol() ; Auto-size each column to fit its contents.
    LV_ModifyCol(2, "Integer") 
    }
    

  find() {
    global
    GuiControlGet, Search ;and d!=Search
    if (Search!="") {
      d := Search
      LV_Delete()
      loop, %length%
      {
        e:=A_Index
        c := steam.Finder[e].name()
        if InStr(c, d)
        {
          LV_Add("", c, b)
        }
      }
    }
    if (d!="") {
      steam.pop()
    }
  }
}
class Srch {
  __New(stuff){
    global
    this.names := stuff[1]
    this.paths := stuff[2]
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