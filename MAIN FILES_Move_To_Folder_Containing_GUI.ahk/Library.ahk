#Include test2.ahk

global LogGames := A_AppDataCommon "\geo3d\geo3dlist.csv" 
global indx := 1
/*
#Include File.ahk
file1 := new File( A_ScriptFullPath ) ;a file object of our test.ahk
file2 := new File( "File.ahk" ) ;a file object of our "File.ahk" containing our file class
Msgbox % file1.getPathDir() ;get containing folder
Msgbox % file2.getPathDir() ;get containing folder

*/


Loop, read, %LogGames%
{
    if (A_Index != 1) {
    a:=[]
    a := StrSplit(A_LoopReadLine,",")
    G%indx% := new Games(a)
    indx++
}
}
 

msgbox % G1.getName()

