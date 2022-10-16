#NoEnv
#SingleInstance, Force
#include ahk countdown msgbox.ahk
    SendMode, Input
SetBatchLines, -1
SetWorkingDir, %A_ScriptDir%
global CSVer:= A_ScriptDir "\WmiData.csv"
global steamlog := A_ScriptDir "\transcoded_steam_library.txt"
FileDelete, %CSVer%
powershell=
(
Get-ChildItem -Path HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | ? { -not [string]::IsNullOrEmpty($_.DisplayName) } | Sort-Object -Property DisplayName | Select-Object -Property DisplayName, DisplayVersion, InstallLocation | Export-Csv -Path .\WmiData.csv -NoTypeInformation 
)
Run, powershell -NoExit -Command "%powershell%",,Min
msg()
;Run, *RunAs "powershell" -Command "&{%powershell%}"

            Winclose, Windows PowerShell
looper()

looper() {
    global
    Loop, Read, %CSVer%
    {
        loop, parse,A_LoopReadLine, `,
         ; parse string
        {
            A:=[]
            A:=StrSplit(A_LoopField, "\") 
            Loop, % A.Length()
            {
              if InStr(A[A_index], "SteamLibrary")
                c.= "======>" A_LoopReadLine "`n"
            }
        }
    }
    msgbox %c%
    filedelete, %steamlog%
    fileappend, %c%, %steamlog%
}  