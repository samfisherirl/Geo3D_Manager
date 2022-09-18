setWorkingDir, %A_ScriptDir% 

        a := A_Desktop "\2.txt"
        B := A_Desktop "\1.txt"
 
        I:= """"
        x := "xcopy " 
            . I . B . I . " " 
            . I . A . I . " /C /O /I /H /y" 
        FileDelete, %B%
        FileAppend, %x%, %B%  
        DllCall("AllocConsole")  ; Give me a console window.
        Run, %x%  

        msgbox %X%


        Run % "xcopy """ . var1 . """ ""C:\Users\dower\Desktop\2.txt"""