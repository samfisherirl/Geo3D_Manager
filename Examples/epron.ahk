#NoEnv
#SingleInstance force
SetTitleMatchMode, 2
SetWorkingDir, %A_ScriptDir%
;#include <UIA_Interface> ; Uncomment if you have moved UIA_Interface.ahk to your main Lib folder
#include ..\Lib\UIA_Interface.ahk
;#include <UIA_Browser> ; Uncomment if you have moved UIA_Browser.ahk to your main Lib folder
#include ..\Lib\UIA_Browser.ahk

Doer() {
browserExe := "chrome.exe"
incog := "New Incognito Tab"
UIA := new UIA_Browser("ahk_exe " browserExe) 

WinActivate, EPORNER   
url  := UIA.GetCurrentURL(fromAddressBar=False)
sleep, 500

Run, %browserExe% -incognito --force-renderer-accessibility ; Run in Incognito mode to avoid any extensions interfering. Force accessibility in case its disabled by default.
WinWaitActive, %incog%
cUIA := new UIA_Browser("ahk_exe " browserExe) ; Initialize UIA_Browser, which also initializes UIA_Interface

cUIA.WaitPageLoad("New Tab", 500)
cUIA.Navigate(url)  ; Wait the New Tab page to load with a timeout of 3 seconds
sleep, 500

EnglishEl := cUIA.WaitElementExistByName("Download") ; Find the English language radiobutton
EnglishEl.Click()
sleep, 500    


allEnglishEls := cUIA.FindAllByName("Download MP4",,2) ; Find all elements with name "English"
johnny := allEnglishEls[allEnglishEls.MaxIndex()].CurrentValue 

sleep, 240    
cUIA.CloseTab()
sleep, 240  
HereSphere := "HereSphere"
WinActivate, HereSphere 
sleep, 500    
WinActivate, ahk_id 0x32002
Sleep, 100 
 
 SendRaw, %johnny%
 Send, {Enter}



 Sleep, 1000 




; If the "I agree" or "Accept all" button exists, then click it to get rid of the consent form
;               ------------------------------
;               ------------------------------
;               this works this works
;               ------------------------------
;               ------------------------------
;               ------------------------------
;allEnglishEls := cUIA.FindAllByName("English") ; Find all elements with name "English"
;allEnglishEls[allEnglishEls.MaxIndex()].Click() 

;               ------------------------------
;               ------------------------------
;               this works this works
;               ------------------------------
;               ------------------------------
;               ------------------------------

;Looking for a partial name match "Searc" using matchMode=2. FindFirstByNameAndType is not used here, because if the "I agree" button was clicked then this element might not exist right away, so lets first wait for it to exist.
;searchBox.SetValue("autohotkey forums") ; Set the search box text to "autohotkey forums"



;Clipboard=
;Clipboard := cUIA.GetCurrentDocumentElement().DumpAll() ; Get the current document element (this excludes the URL bar, navigation buttons etc) and dump all the information about it in the clipboard. Use Ctrl+V to paste it somewhere, such as in Notepad.   

}