#Include test.ahk

global LogGames := A_AppDataCommon "\geo3d\gameslist.txt" 
global CSVG := A_ScriptDir "\Lib\geo3d.csv"
global indx := 1
line:=[]
/* 
	Game Name
1	Alan Wake Remastered
2	Assassin's Creed 1
3	Assassin's Creed II
4	Assassin's Creed IV Black Flag
5	Control
6	Cyberpunk 2077
7	Days Gone
8	Forza Horizon 5
9	Judgement
10	Lost Judgement
11	Marvel's Spider-Man Remastered
12	Need For Speed Hot Pursuit Remastered
13	!32-bit DX10-11
14	!32-bit DX9
15	!64-bit DX10-11
16	!64-bit DX12
17	!64-bit DX9


*/

FileCopy, %CSVG%, out.txt, 1

Loop, read, out.txt
{    
    Line := StrSplit(A_LoopReadLine, ",")
    fuck%indx% := Line[3]
    Game%indx% := new File(Line)
    global indx++ 
}
 

msgbox % Game2.getGame()

