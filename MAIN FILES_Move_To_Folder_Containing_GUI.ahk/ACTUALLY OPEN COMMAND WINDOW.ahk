WorkingDir, %A_ScriptDir% 
        a := "timeout /t 10"
        a := A_Desktop "\2.txt"
        B := A_Desktop "\1.txt"
 
        I:= `""""
        x := "xcopy " 
            . I . B . I . " " 
            . I . A . I 
        msgbox %X%
        FileAppend, %x%, %B%  
        DllCall("AllocConsole")  ; Give me a console window.
        Run, %x%  
