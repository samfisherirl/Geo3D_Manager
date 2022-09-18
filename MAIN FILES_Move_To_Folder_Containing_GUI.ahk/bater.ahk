
#NoEnv
SetBatchLines, -1
found := 0
; Include the Neutron library 
Loop, Files, %A_ScriptDir%\Geo3d\*.*, R
{
  if InStr(A_LoopFileFullPath, "Reshade")
    found:=1
}
msgbox % found