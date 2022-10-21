SetWorkingDir, %A_ScriptDir%
global CSVer:= A_ScriptDir "\WmiData.csv"
global steamlog := A_ScriptDir "\steam.txt"

;steam.prompt()

Class steam
{
  prompt() { 
    OnMessage(0x44, "OnMsgBox1")
    MsgBox 0x81, Select, Would you like to select from Steam Library games or select a Game Folder Manually?
    OnMessage(0x44, "")

    IfMsgBox OK, {
      return 1 ;steamlibarry
    } Else IfMsgBox Cancel, {
      return 0 ;folder select
    }
  }

  show() {
    global 
    Gui, Color, 27283C, 27283C
    Gui, Font, s10 c0xE3D2FF, Verdana
    Gui, Add, ListView, cwhite r20 w700 y100 gMyListView, Name|Addy|ID
    Gui Add, Text, x256 y7 w407 h23 , <== Search here. Then double click to select. 
    Gui Add, Edit, vSearch x16 y8 w220 h21,
    ; Gather a list of Finder names from a folder and put them into the ListView:
    Finder:=[]
    filedelete, %SteamLog%
    length:=1
    Loop, Read, %CSVer%
    {
      A:=[]
      id:=A_Index
      loop, parse, A_LoopReadLine, `,
      {
        A:=StrSplit(A_LoopField, "\")
        Loop, % A.Length() {
          if InStr(A[A_index], "steamapps") {
            Finder.Push(new Srch([A_LoopReadLine,A_LoopReadLine,length]))
            val:=StrSplit(A_LoopReadLine,"""")
            LV_Add("", val[2], val[4], length)
            length := length+1
            fileappend, % val.2 "," val[4] "," length "`n", %steamlog%

          }
        }
      }
    }
    LV_ModifyCol() ; Auto-size each column to fit its contents.
    LV_ModifyCol(2)
    LV_ModifyCol(3, "Integer")
    ; For sorting purposes, indicate that column 2 is an integer.

    SetTimer, Find, 100

    ; Display the window and return. The script will be notified whenever the user double clicks a row.
    Gui, Show
    return

    MyListView:
      if (A_GuiEvent = "DoubleClick")
      {
        LV_GetText(RowText, A_EventInfo,3) ; Get the text from the row's first field.
        RowText := Trim(RowText)
        name := Finder[RowText].name()
        MsgBox 0x34, Install Geo3D for %name%?
        IfMsgBox Yes, {
          Finder[RowText].path()
        } 
      }
    find:
      steam.find()
    return
    GuiEscape: 
    ExitApp  ; All of the above labels will do this.
    
  }

  find() {
    global
    GuiControlGet, Search ;and d!=Search
    if (Search!="") and (d!=Search) {
      d := Search
      LV_Delete()
      loop, % Finder.Length()
      {
        e:=A_Index
        c := Finder[e].name()
        f := Finder[e].path()
        h := Finder[e].id()
        if InStr(c, d)
        {
          LV_Add("", c, f, h)
        }
      }
    }
    if (Search="") and (d!="")
    {
      LV_Delete()
      loop, % Finder.Length()
      {
        k:=Finder[A_Index]
        LV_Add("", k.name(), k.path(), A_Index)
        length := A_Index

      }
      d:=""
    }
    ;if (d!="") {
    ;  steam.pop()
    ; }
  }
}
class Srch {
  __New(stuff){
    global
    val:=[]
    val := StrSplit(stuff[1],"""")
    this.names := val[2]
    this.paths := val[4]
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

OnMsgBox1() {
  DetectHiddenWindows, On
  Process, Exist
  If (WinExist("ahk_class #32770 ahk_pid " . ErrorLevel)) {
    hIcon := LoadPicture("C:\Users\dower\Documents\icons\Steam.ico", "w32 Icon1", _)
    SendMessage 0x172, 1, %hIcon%, Static1 ; STM_SETIMAGE
    ControlSetText Button1, Steam
    hIcon := LoadPicture("C:\Users\dower\Documents\icons\Steam.ico", "h16 Icon1", _)
    SendMessage 0xF7, 1, %hIcon%, Button1
    ControlSetText Button2, Browse
    hIcon := LoadPicture("C:\Users\dower\Documents\icons\File Explorer.ico", "h16 Icon1", _)
    SendMessage 0xF7, 1, %hIcon%, Button2
  }
}