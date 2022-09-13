﻿#NoEnv
#SingleInstance force
SetTitleMatchMode, 2

;#include <UIA_Interface> ; Uncomment if you have moved UIA_Interface.ahk to your main Lib folder
#include ..\Lib\UIA_Interface.ahk

Run, notepad.exe
UIA := UIA_Interface() ; Initialize UIA interface
WinWaitActive, ahk_exe notepad.exe
npEl := UIA.ElementFromHandle("ahk_exe notepad.exe") ; Get the element for the Notepad window
MsgBox, % npEl.DumpAll() ; Display all the sub-elements for the Notepad window. Press OK to continue
documentEl := npEl.FindFirstByType("Document") ; Find the first Document control (in Notepad there is only one). This assumes the user is running a relatively recent Windows and UIA interface version 2+ is available. In UIA interface v1 this control was Edit, so an alternative option instead of "Document" would be "UIA.__Version > 1 ? "Document" : "Edit""
documentEl.Value := "Lorem ipsum" ; Set the value of the document control, same as documentEl.SetValue("Lorem ipsum")
MsgBox, Press OK to test saving. ; Wait for the user to press OK
fileEl := npEl.FindFirstByNameAndType("File", "MenuItem") ; Find the "File" menu item
fileEl.Highlight()
fileEl.Click()
saveEl := npEl.WaitElementExistByName("Save",,2) ; Wait for the "Save" menu item to exist
saveEl.Highlight()
saveEl.Click() ; And now click Save
ExitApp

