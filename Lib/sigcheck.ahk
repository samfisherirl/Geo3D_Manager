; Generated by Auto-GUI 3.0.1 
SetBatchLines -1  
;#Include %A_ScriptDir%\lib\Neutron.ahk 
global Dir := A_AppDataCommon "\geo3d"
SettitleMatchmode, 2
;LogRead()

;browsefor()
;Gameexe := "samsung"
;Removefromlog() 
/*
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
*/

class lib2
{
    looper(){
        global
        Loop, Files,  %Select%\*.*, FR
        {
            if instr(A_LoopFileFullPath, "reshade")
            { 
                looped:=1
                    break
            }
        }
        if (looped="")
        {
            OnMessage(0x44, "OnMsgBox")
            MsgBox 0x24, Select DirectX Version. , Please Select the game's DirectX Version. (if unknown`, check pcgamingwiki.com)
            OnMessage(0x44, "")
            
            IfMsgBox Yes, {
                     } Else IfMsgBox No, {
        return "dx11" 
    }
    
}
}
}

browsefor()
{    
    global  
    
    lib.selector.file()
    if (selectgame="")
        goto, leaver  
    
    /*
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
    ;DllCall("AllocConsole")  ; Give me a console window.
    sleep, 100
    ;Run, %writetobat%  
    ;Run, "timeout /t 10"
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
            {
                msgbox, unknown game version     
                bits := "64"
                install(bits)    
            }                 
        }
    }
    */
    
    leaver:
    }
    
    SteamImport()
    {   
        global CSVer:= A_ScriptDir "\WmiData.csv"
        FileDelete, %CSVer%
        powershell=
        (
        Get-ChildItem -Path HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | ? { -not [string]::IsNullOrEmpty($_.DisplayName) } | Sort-Object -Property DisplayName | Select-Object -Property DisplayName, DisplayVersion, InstallLocation | Export-Csv -Path .\WmiData.csv -NoTypeInformation 
            )
        Run, powershell -NoExit -Command "%powershell%"
        ;Run, *RunAs "powershell" -Command "&{%powershell%}"
        winwait, powershell  
        county:=1 
        Title := "Importing Steam Library...", 
        Sec := 3 
        MsgBox, 64, %Title%, Importing Steam Library in... %Sec% seconds, %Sec% 
        settimer, Countdown, 500
    Countdown:
        if fileexist(CSVer) 
        {        
            FileGetSize, Sizer, %CSVer%  
            FileGetSize, Sizer2, %CSVer% 
            if (Sizer=Sizer2)
            {
                settimer, Countdown, off
                Goto, exiter
            }    
            else {
                
                sleep, 500 
                if (Sec<=1)
                { 
                    Exitapp
                }
                ControlSetText, Static2, % "Importing Steam Library in... " (Sec:=Sec-1) " seconds", %Title% ahk_class #32770
                return
            } 
            
        }
    exiter:
        Sleep, 500
        Winclose, Windows PowerShell
    } 
    
    
    PushUpdates() {
        global LogGames
        GameLocation:=[]
        countlines:=1
        GameExe:=[] 
        bits:=[]
        founder := "0"  
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
    