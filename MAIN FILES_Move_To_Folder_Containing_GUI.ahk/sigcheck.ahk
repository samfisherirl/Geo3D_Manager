; Generated by Auto-GUI 3.0.1
#NoEnv
SetWorkingDir, %A_ScriptDir%
SetBatchLines -1  
    ;#Include %A_ScriptDir%\lib\Neutron.ahk
global LogGames := A_AppDataCommon "\geo3d\gameslist.txt" 
global Dir := A_AppDataCommon "\geo3d"
;LogRead()

;browsefor()
;Gameexe := "samsung"
;Removefromlog() 

browsefor1()
{

    c := "fuck yeah"
    a := A_Desktop "\2.txt"
    B := A_Desktop "\1.txt"
    d := A_Desktop "\3.txt"
    e := A_Desktop "\4.txt"     
       I:= """"
    x := "xcopy " 
        . I . B . I . " " 
        . I . A . I . " /C /O /I /H /y" 
    FileDelete, %B%
    FileAppend, %c%, %B%  

    msgbox %X%
            DllCall("AllocConsole")  ; Give me a console window.
    Run, %x%  
    fileappend, %C%, %D%
    filemove, %D%, %E%, 1

    Run % "xcopy " . I . B . I . " " . I . "C:\Users\dower\Desktop" . " /C /F /O /I /H /y" . I

    
    msgbox % "xcopy " . I . B . I . " " . I . "C:\Users\dower\Desktop\2.txt" . I . " /C /F /O /I /H /y" I
}

browsefor()
{
    global Selectgame, Gameexe, Gamepath, Gameextenstion, Gamenameonly, successbi
    ;declare to be used elsewhere
    selectgame := ""
    FileSelectFile, Selectgame, 1, , Select a game, Application (*.exe)
    ;browse for file
    if (Selectgame = "")
    {
        MsgBox, You didn't select anything.
        goto, leaver
    }
    else
    {
        SplitPath, Selectgame, Gameexe, Gamepath, Gameextenstion, Gamenameonly
    }
    bat := A_ScriptDir "\1.bat"
    txt := A_ScriptDir "\1.txt"
    sigcheck := A_ScriptDir "\sigcheck64.exe"
    logger := A_ScriptDir "\output.txt" 
    Field:=[]
    FileDelete, %bat%
    FileDelete, %logger% 
    T := `""""
    ;check for 64x or 32x  
    writetobat := T . sigcheck . T . " -a -c " . T . Selectgame . T . " > " . T . logger . T 
    msgbox, %writetobat%
    ;DllCall("AllocConsole")  ; Give me a console window.
    sleep, 100
    ;Run, %writetobat%  
    ;Run, "timeout /t 10"
    sleep, 100  
    FileAppend, %writetobat%, %txt%
    filemove, %txt%, %bat%, 1
    Run *Runas %bat%
    sleep, 500
    Loop, read, %logger%
    {  
        if (A_Index = "2")
        {   
            Col := A_LoopReadLine
            Field := StrSplit(Col, ",") 
            for index, value in Field
            {
                if InStr(value, "bit")
                {
                    bit := value
                    break
                }
            } 
            Delim := `"""" 
            bit := StrReplace(bit, Delim) 
            ; NewStr := StrReplace(Str, """")
            
            ; bit := Trim(bit) """
            Msgbox % bit ; <<<<<<< the field 1 and row 1
            if InStr(bit,"32")
            {
                bits := "32"
                install(bits)
            }
            else if InStr(bit,"64")
            {
                bits := "64"
                install(bits)                
            }
            else
                msgbox, unknown game version                       
        }
    }
    
    Addtolog(bits)
    CleanLog()
    
    LogRead()
    
    leaver:
    }
    
    RemoveGame(gametouninstall)
    {
        global LogGames, backupfolder, bits, DirLocal, founder
        html:=""
        sep := "`n"
        GameLocation:=[]
        countlines:=1
        GameExe:=[] 
        founder := "0"  
        ; map button id to log file  
        Loop, Read, %LogGames%
        {
            if (A_LoopReadLine != "") {
                    Info := A_LoopReadLine
                    GameInfo := StrSplit(Info, ",") 
                    GameLocation[countlines] := GameInfo[4]
                    GameExe[countlines] := GameInfo[3]
                global GE := GameExe[countlines]
                global GL := GameLocation[countlines]
                if InStr(GE, gametouninstall)
                { 
                    found := "1"
                    global founder := "1"
                    msgbox, % GE GL founder 
                    break
                }
                countlines++  
            } 
        }  
        if (founder="1") {
        filesafe := ["VRExport_64.addon", "VRExport_32.addon", "ReShade.ini", "Geo3D.addon", "dxgi.dll", "3DToElse.fx"] 
        for index, value in filesafe 
        {
            FileMove, %GL%\%value%, %DirLocal%, 1
        }
        backupfolder := GL "\backup_files_geo_vr"
        if (founder = "1")
        { 
        
            Removefromlog(GE)
            LogRead()
        }
    }
        leaver44:
        ; restore backups 
    }


PushUpdates() {
    global LogGames
    GameLocation:=[]
    countlines:=1
    GameExe:=[] 
    bits:=[]
    found := "0"  
    ; map button id to log file  
    Loop, Read, %LogGames%
    {
        if (A_LoopReadLine != "") {
            Info := A_LoopReadLine
            GameInfo := StrSplit(Info, ",") 
            GameLocation[countlines] := GameInfo[4]
            GameExe[countlines] := GameInfo[3]
            bits[countlines] := GameInfo[5]
            countlines++
        }  
    }  
    bat := A_ScriptDir "\updater.bat"
    bat1 := A_ScriptDir "\updater1.bat"
    batwriter := ""
    Loop, %countlines%
    {
        GL := GameLocation[A_Index]
        bit := bits[A_Index]
        if (GL != "") {
        LocalGeo3D := A_ScriptDir "\geo3d\" bit "-bit"
        FileCopy, %LocalGeo3D%\*.*, %GL%, 1
        /*
(
%batwriter%
xcopy "%LocalGeo3D%" "%GL%" /C /O /I /H /y
)
        ; THIS NEEDS TO WRITE BAT .= "`n"
        */
        }
    }
     /*
    FileAppend, %batwriter%, %bat1%
    sleep, 150
    FileMove, %bat1%, %bat%, 1  
    try {        
        Run, *Runas %bat%,, min
        msgbox, Thanks for your patience, updating all Geo3D locations. 
          } catch {
            MsgBox, Could not obtain admin privileges. The Program will restart. 
            Run *RunAs %A_ScriptFullPath%
            goto, leaver33
          }  
          
         */
          leaver33:
}
/*

next function

*/
