/*
THIS SCRIPT LAUNCHES BOOTSTRAP.HTML
IMPORTS LOCAL LIBRARIES
PUSHES JAVASCRIPT TO DOM TABLES / SETUP TAB 
BUTTONS ON BOOTSTRAP.HTML CORRISPOND TO FUNCTIONS ON THIS PAGE 
*/

#NoEnv
SetBatchLines, -1 
SetWorkingDir, %A_ScriptDir%
#SingleInstance, Force


global LogGames := A_AppDataCommon "\geo3d\gameslist.txt"
global CSVLog := A_ScriptDir "\Lib\geo3d.csv"
global logger := A_AppDataCommon "\output.txt"
global DirLocal := A_AppDataCommon "\geo3d"
FileCreateDir, A_AppDataCommon "\Geo3d"


; Include the Neutron library
#Include %A_ScriptDir%\lib\Neutron.ahk
#Include %A_ScriptDir%\lib\UIA_Browser.ahk
#Include %A_ScriptDir%\lib\sigcheck.ahk
#Include %A_ScriptDir%\lib\OTA.ahk
#Include %A_ScriptDir%\lib\RTA.ahk
#Include %A_ScriptDir%\lib\bits.ahk 
#include %A_ScriptDir%\lib\JSON.ahk  

; Create a new NeutronWindow and navigate to our HTML page
neutron := new NeutronWindow()
neutron.Load("Bootstrap.html")

; Use the Gui method to set a custom label prefix for GUI events. This code is
; equivalent to the line `Gui, name:+LabelNeutron` for a normal GUI.
neutron.Gui("+LabelNeutron")

; Show the Neutron window
neutron.Show("w1200 h900")
;LogRead() 
OnLoad()
return
 

FileInstall, image.png, %A_ScriptDir%\image.png, 1 ;
FileInstall, Bootstrap.html, %A_ScriptDir%\lib\Bootstrap.html, 1
FileInstall, bootstrap.min.css, %A_ScriptDir%\lib\bootstrap.min.css 
FileInstall, bootstrap.min.js, %A_ScriptDir%\lib\bootstrap.min.js
FileInstall, jquery.min.js, %A_ScriptDir%\lib\jquery.min.js 
 
NeutronClose:
    ExitApp
return

/*
updateimage() 
{
    global neutron
    loop, 5 
    {
        img := A_ScriptDir "\2.png"
        imagehtml=
        (
        <img src="%img%" style="width:500px" alt="" id="image"/>
        )
        neutron.qs("#image").innerHTML := imagehtml
        sleep, 50
    }
}
*/

OnLoad() ; ==> On page load actions
{ 
    global 
    Logs.ReadLog() ; ==> On page load logs 
    ;LogCustom.read()
    ;LogCustom.find()
    bat := a_scriptdir "\lib\profiles\b.bat" 
    if !fileexist(bat) or !fileexist(LogGames) or !FileExist(CSVLog) { 
        ;profiles := "\lib\profiles"
        lib.7za.move7za("\lib\profiles") ; ==> export profiles from zip   
        ;profiles := "profiles.7z"
        lib.7za.batwrite("profiles.7z")  ; ==> export profiles from zip
    }
    Lib.writehtml()  ; ==> write javascript for page tables 
    Logs.FeaturedUpdate() ; ==> write javascript for page tables 
    Logs.ReadList() ; ==> On page load logs  
    Lib.customhtml() ; ==> write javascript for page tables
    Logs.CustomUpdate() ; ==> write javascript for page tables
    current:=OTA.currentvers() ; ==> On page load version check 
    
    if (current="")
    { 
        Logs.UpdateMsg() ;===> msgbox "timee for an update!"
        
        if (msg=1) {
            
            latest_tag:=OTA.checkupd() ;===> test for update
            OTA.download(latest_tag) ;===> DL update
            RTA.checkupd()  ;===> dl vrscreencap  
            lib.reshade() ;===> DL reshade
            /*
            NEED TO ADD VRSCREENCAPDOWNLOADGUI
            */
        }
    }
    
    else   
    {
        if !FileExist(DirLocal "\vr-screen-cap.exe")
            RTA.checkupd() 
        if !FileExist(DirLocal "\reshade.exe")
            lib.reshade()
    }    
}

Featured(neutron, event) ;=======> INSTALL PRECONFIGED PROFILE 
{     
    global
    event.preventDefault()
    /* 
    ;lib.7za()   
    */ 
    loop, 7 { 
        Gametoinstall := event.target.getAttribute("name")
        GameID := event.target.getAttribute("id")
        if (Gametoinstall="" and GameID="") {
            sleep, 200
            msgbox fail, notify github.com/samfisherirl
        }
        else
            break
    } 
    msgbox, Select Folder for: %Gametoinstall% 
    Lib.Selector.folder() 
    if (Selectgame = "") {
        MsgBox, You didn't select anything.         
        goto, leaver99
    } 
    else {  
        Source :=  A_ScriptDir "\Lib\profiles\" GameID  
        lib.selector.CopyFilesAndFolders(Source, Selectgame)  
        lib2.looper()
            linenumber := lib.selector.getline(GameID)
        lib.selector.addorremove(linenumber)
        Logs.ReadLog()
        Lib.writehtml()
        Logs.FeaturedUpdate()
    }  
leaver99:
}

Button(neutron, event)
{
    MsgBox, % "You clicked " event.target.innerText
}

Installer(neutron, event) ;=======> INSTALL CUSTOM GAME
{
    global
    event.preventDefault()
    browsefor()
        if (Selectgame="")
    {
        msgbox FAIL
        goto, failer
    }
    lib.selector.VerifyNSplit()
        lib.bitchecker()  ; selects for 32/64 bits
    sleep, 400
    WinClose, command prompt
    Lib.PushBits() ; send bit info to log
    install() ; send proper bit folder to game folder
    Addtolog() ;write to exteneded log
    CleanLog() 
    ; >>>>>>>>>>>>>>>>>>>>>>> logs.takeownership()
    logs.ReadList()
    Lib.customhtml()
    Logs.CustomUpdate()
    msgbox, Geo3D has been added to %Gameexe%!
failer:
}

Uninstall1(neutron, event) ;=======> UNINSTALL PRECONFIGED PROFILE 
{
    global   
    event.preventDefault()
    gametoremove := event.target.getAttribute("name")
    GameID := event.target.getAttribute("id") 
    MsgBox 0x4, Remove game, Would you like to remove %gametoremove% ? 
    ;@ahk-neko-ignore-fn 1 line; at 10/4/2022, 8:11:14 AM ; param is assigned but never used.
    IfMsgBox Yes, {
        linenumber := ""
    linenumber := lib.selector.getline(GameID) 
    if (linenumber="" and GF="") { 
        msgbox fail
        goto, leaverr
    }
    location := lib.selector.FandFloop(GF)
    filesafe := []
    filesafe := lib.selector.Register() 
    lib.selector.Uninstaller() 
    lib.batremove(GF)
    Selectgame := "Not Installed"
    lib.selector.addorremove(linenumber)
    Logs.ReadLog()
    
    Lib.writehtml(countlines, GameLocation, GameExe)
    Logs.FeaturedUpdate()
} Else IfMsgBox No, {
}
leaverr:
}

Uninstall2(neutron, event) ;=======> UNINSTALL CUSTOM PROFILE 
{	  
    global 
    event.preventDefault()
    gametouninstall := event.target.getAttribute("id")
    if (gametouninstall = "") {
        loop, 5 { 
            gametouninstall := event.target.getAttribute("id")
            if (gametouninstall="")  {
                sleep, 150
            }
            else
                break
        }
    }
    
    
    /*
    GameID := event.target.getAttribute("id")
    gametouninstall := event.target.getAttribute("name")
    MsgBox 0x4, Remove game, Would you like to remove %gametouninstall% %GameID%? 
    */
    ;@ahk-neko-ignore-fn 1 line; at 10/4/2022, 8:11:14 AM ; param is assigned but never used.
    
    MsgBox 0x34, Would you like to remove?, Would you like to remove  %gametouninstall%?
    
    IfMsgBox Yes, {
        logs.ReadList()
    
    file:=lib.ArrayRemove(gametouninstall)
    lib.batremove(file)
    lib.RemoveGame()
    ;UIN.remove()
    ; UIN.Removefromlog()
    Logs.ReadList()
    Lib.customhtml()
    Logs.CustomUpdate()
    
} 
Else IfMsgBox No, {
    
} 
}
Update(neutron, event) 
{
    PushUpdates()
    
}

Steam(neutron, event)
{
  lib.SteamImport()
  lib.Looper()
    
}

Discord(neutron, event) {  
    
    lib.LaunchChrome()
    lib.TryWebsite("https://discord.gg/hkPR82bx9u")
    
}

Patreon(neutron, event) { 
    
    
    
    lib.LaunchChrome()
    lib.TryWebsite("https://www.patreon.com/Flugan/posts")
    
    /*
    browserExe := "chrome.exe"
    Run, %browserExe% -incognito --force-renderer-accessibility ; Run in Incognito mode to avoid any extensions interfering. Force accessibility in case its disabled by default. 
        loop, 15
    {
        try {
            cUIA := new UIA_Browser("ahk_exe " browserExe) ; Initialize UIA_Browser, which also initializes UIA_Interface
            cUIA.Navigate("https://www.patreon.com/Flugan/posts") 
            break
        } catch {
            Sleep, 150
        }
    }
    */
}

Submit(neutron, event)
{
    ; Some events have a default action that needs to be prevented. A form will
    ; redirect the page by default, but we want to handle the form data ourself.
    event.preventDefault()
    
    ; Use Neutron's GetFormData method to process the form data into a form that
    ; is easily accessed. Fields that have a 'name' attribute will be keyed by
    ; that, or if they don't they'll be keyed by their 'id' attribute.
    formData := neutron.GetFormData(event.target)
        
    ; You can access all of the form fields by iterating over the FormData
    ; object. It will go through them in the order they appear in the HTML.
    out := "Access all fields by iterating:`n"
    for name, value in formData
        out .= name ": " value "`n"
    out .= "`n"
    
    ; You can also get field values by name directly. Use object dot notation
    ; with the field name/id.
    out .= "Or access individual fields directly:`n"
    out .= "Email: " formData.inputEmail "`n"
        out .= "Password: " formData.inputPassword "`n"
        if formData.gridCheck
        out .= "You checked the box!"
    else
        out .= "You didn't check the box."
    
    ; Show the output
    MsgBox, %out%
}

OnError("LogError")
%cause% := error

LogError(exception) {
    msgbox, please restart application, if you can, provide the log file sent to the relative path: %A_ScriptDir%
    FileAppend % "Error on line " exception.Line ": " exception.Message "`n"
    , errorlog.txt
return true
}
Class do
{    
    Class reshade{
      unzip() {
        FL := [A_ScriptDir "\lib\reshade.exe"] 
        com := new Command(FL)
        com.unzip() 
        com.try()
      }
    }
  } 