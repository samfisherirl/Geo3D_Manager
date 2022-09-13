#NoEnv
#SingleInstance force
SetTitleMatchMode, 2
;#include <UIA_Interface> ; Uncomment if you have moved UIA_Interface.ahk to your main Lib folder
#include ..\Lib\UIA_Interface.ahk
;#include <UIA_Browser> ; Uncomment if you have moved UIA_Browser.ahk to your main Lib folder
#include ..\Lib\UIA_Browser.ahk

browserExe := "chrome.exe"
Run, %browserExe% -incognito --force-renderer-accessibility ; Run in Incognito mode to avoid any extensions interfering. Force accessibility in case its disabled by default.
WinWaitActive, ahk_exe %browserExe%
cUIA := new UIA_Browser("ahk_exe " browserExe) ; Initialize UIA_Browser, which also initializes UIA_Interface
john:=Clipboard
; Before doing a translate, lets first set Google services language to English to ensure that locale-specific words are in English (if Google is in German for example, "English" would be "Englisch"
cUIA.WaitPageLoad("New Tab", 1000) ; Wait the New Tab page to load with a timeout of 5 seconds
cUIA.Navigate(john) ; Set the URL and navigate to it
cUIA.WaitPageLoad() ; Wait the page to load

 
;https://www.eporner.com/video-SR4SykvAD9X/unbelievable-sex-with-real-college-teen-cowgirl-doggystyle-natural-tits/
 
EnglishEl := cUIA.WaitElementExistByName("Download") ; Find the English language radiobutton
EnglishEl.Click()
sleep, 1000   
 allEnglishEls := cUIA.FindAllBy("Download") ; Find all elements with name "English"
msgbox % allEnglishEls

allEnglishEls := cUIA.FindAllByName("Download") ; Find all elements with name "English"
allEnglishEls[allEnglishEls.MaxIndex()].Click()


msgbox % cUIA.FindFirstByName("dloaddivcol").Click(100)
Clipboard=
Clipboard := cUIA.GetCurrentDocumentElement().DumpAll() ; Get the current document element (this excludes the URL bar, navigation buttons etc) and dump all the information about it in the clipboard. Use Ctrl+V to paste it somewhere, such as in Notepad.
ClipWait, 1
if Clipboard
	MsgBox, Page information successfully dumped. Use Ctrl+V to paste the info somewhere, such as in Notepad.
else
	MsgBox, Something went wrong and nothing was dumped in the clipboard!

/*

allEnglishEls := 
if (cUIA.FindAllByName("2160p"))
cUIA.FindAllByName("2160p").Click()
else if (cUIA.FindAllByName("1440p"))
cUIA.FindAllByName("1440p").Click() ; Find all elements with name "English"  
  ; To find the "Save" button, we need to use a TreeWalker to get the next button element from the radiobutton, since "Save" differs between languages
TW.GetNextSiblingElement(EnglishEl).Click(2000) ; Find the "Save" button, click it, and Sleep for 2000ms
cUIA.CloseAlert() ; Sometimes a dialog pops up that confirms the save, in that case press "OK"
cUIA.WaitPageLoad("Google") ; Wait for Google main page to load, default timeout of 10 seconds

cUIA.Navigate("https://translate.google.com/") ; Navigate to Google Translate
cUIA.WaitPageLoad()
cUIA.FindFirstByName("inputText").Click() ; Click source languages selection
cUIA.WaitElementExistByName("Spanish").Click(500) ; Select Spanish, Sleep for 500ms
cUIA.FindFirstByName("More target languages").Click(500) ; Open target languages selection, Sleep for 500ms
allEnglishEls := cUIA.FindAllByName("English") ; Find all elements with name "English"
allEnglishEls[allEnglishEls.MaxIndex()].Click() ; Select the last element with the name English (because English might also be an option in source languages, in which case it would be found first)

cUIA.WaitElementExistByName("Source text").SetValue("Este es un texto de muestra") ; Set some text to translate
*/
ExitApp
