setWorkingDir, %A_ScriptDir% 
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