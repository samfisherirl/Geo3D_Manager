; Generated by Auto-GUI 3.0.1
#NoEnv
SetWorkingDir, %A_ScriptDir%
SetBatchLines -1  
Title := "Importing Steam Library...", Sec := 5

SetTimer, Countdown, 1000

MsgBox, 64, %Title%, Importing Steam Library in... %Sec% seconds, %Sec%

Return



Countdown:
if (Sec=<1)
{ 
    Exitapp
}
 ControlSetText, Static2, % "Importing Steam Library in... " (Sec:=Sec-1) " seconds"

               , %Title% ahk_class #32770

Return
