    #NoEnv
    #SingleInstance, Force
        SendMode, Input
    SetBatchLines, -1
    SetWorkingDir, %A_ScriptDir%
    firefox:="firefox.exe"
    do(firefox)

    do(prog) {
        If !WinExist("ahk_exe " prog)
        {
            msgbox, Running! %prog% must not be open.
            Run, %prog%, %A_Programfiles%
        }
        WinMove, ahk_exe %prog%, -2568, -8
        
        WinMaximize, ahk_exe %prog%
        WinActivate, ahk_exe %prog%
    }