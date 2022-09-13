#Persistent 
settimer, five, 50
five:
If (GetKeyState("RButton") = "D")
{
    SetNumLockState, On
}
else 
{
    SetNumLockState, Off
}
