/*
Compile Me!

NEEED TO DO






GET FILE STRUCTURES AND ADD TO CSV



 










*/

#NoEnv
SetBatchLines, -1 
SetWorkingDir, %A_ScriptDir%
#SingleInstance, Force
global LogGames := A_AppDataCommon "\geo3d\gameslist.txt"
global CSVLog := A_ScriptDir "\Lib\geo3d.csv"
; Include the Neutron library
#Include %A_ScriptDir%\lib\Neutron.ahk
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

; FileInstall all your dependencies, but put the FileInstall lines somewhere
; they won't ever be reached. Right below your AutoExecute section is a great
; location! sigcheck64.exe 7za.exe

FileInstall, image.png, %A_ScriptDir%\image.png, 1 ;
FileInstall, Bootstrap.html, %A_ScriptDir%\lib\Bootstrap.html, 1
FileInstall, bootstrap.min.css, %A_ScriptDir%\lib\bootstrap.min.css 
FileInstall, bootstrap.min.js, %A_ScriptDir%\lib\bootstrap.min.js
FileInstall, jquery.min.js, %A_ScriptDir%\lib\jquery.min.js 

; The built in GuiClose, GuiEscape, and GuiDropFiles event handlers will work
; with Neutron GUIs. Using them is the current best practice for handling these
; types of events. Here, we're using the name NeutronClose because the GUI was
; given a custom label prefix up in the auto-execute section.
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

OnLoad() 
{ 
    global countlines, Gameexe, GameLocation
    Logs.ReadLog()
    ;LogCustom.read()
    ;LogCustom.find()
    bat := a_scriptdir "\lib\profiles\b.bat"
    
    
    if !fileexist(bat) {
        
        ;profiles := "\lib\profiles"
        lib.7za.move7za("\lib\profiles")
        
        ;profiles := "profiles.7z"
        lib.7za.batwrite("profiles.7z", "\lib\profiles")
    }
    Lib.writehtml(countlines, GameLocation, GameExe)
    
    Logs.FeaturedUpdate()
    
    Logs.ReadList()

    Lib.customhtml(countlines, GameLocation, GameExe)
    Logs.CustomUpdate()
    current:=OTA.currentvers()
    
    if (current="")
    { 
        global msg:=0
        Logs.UpdateMsg()
        if (msg=1) {
            
            latest_tag:=OTA.checkupd()
            OTA.download(latest_tag)
            RTA.checkupd()
            /*
            NEED TO ADD VRSCREENCAPDOWNLOADGUI
            */
        }
    }
    else   
    {
        OTA.runcheck(current)
    }
}
Featured(neutron, event)
{     
    global
    /*
    
    
    ;lib.7za() 
    
    */
    
    
    loop, 7 {
        
    Gametoinstall := event.target.getAttribute("name")
    GameID := event.target.getAttribute("id")
    if (Gametoinstall="" and GameID="") {
        sleep, 200
        msgbox fail
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
        linenumber := lib.selector.getline(GameID)
        lib.selector.addorremove(linenumber)
        Logs.ReadLog()
        Lib.writehtml(countlines, GameLocation, GameExe)
        Logs.FeaturedUpdate()
    } 
    
    
    
    
leaver99:
}

Button(neutron, event)
{
    MsgBox, % "You clicked " event.target.innerText
}

Installer(neutron, event)
{
    browsefor()

    }

Uninstall1(neutron, event)
{
    global 
    loop, 3 {
        
    GameID := event.target.getAttribute("id")
    gametoremove := event.target.getAttribute("name")
        if (gametoremove="") {
            sleep, 200
        }
        else
            break
        }
        
    MsgBox 0x4, Remove game, Would you like to remove %gametoremove%?
    
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
        lib.selector.Uninstaller(filesafe, location)

        Selectgame := "Not Installed"
        lib.selector.addorremove(linenumber)
        Logs.ReadLog()

        Lib.writehtml(countlines, GameLocation, GameExe)
        Logs.FeaturedUpdate()
} Else IfMsgBox No, {
}
leaverr:
}

Uninstall(neutron, event)
{
    gametouninstall := event.target.getAttribute("id")
    MsgBox 0x4, Remove game, Would you like to remove %gametouninstall%?
    
    ;@ahk-neko-ignore-fn 1 line; at 10/4/2022, 8:11:14 AM ; param is assigned but never used.
    IfMsgBox Yes, {
        RemoveGame(gametouninstall)
} Else IfMsgBox No, {
}
}
Update(neutron, event) 
{
    PushUpdates()
    
}

Steam(neutron, event)
{
    SteamImport()
    
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
