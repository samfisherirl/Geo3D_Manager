﻿/*
Compile Me!

This example is designed to show how you can use third party frameworks like
Bootstrap to build advanced user interfaces, while still keeping all the
    code local. This script can be compiled and still function fine without the
need to extract any files to a temporary directory.

As this example is more advanced, it assumes a stronger familiarity with the
technology and may gloss over some parts more than other examples. If you're
    just getting started it may be helpful to work with some of the other
example scripts first.
*/

#NoEnv
SetBatchLines, -1 
SetWorkingDir, %A_ScriptDir%
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
LogRead() 
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

OnLoad() { 
    
    current:=OTA.currentvers()
    if (current="")
    {         
		MsgBox, 68,, It appears this is your first time using the app. It is recommended that you download both VR_Screen_Cap and the latest Geo3D. Select an option. 
			IfMsgBox Yes, {
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

Button(neutron, event)
{
    MsgBox, % "You clicked " event.target.innerText
}

Installer(neutron, event)
{
    browsefor()
    }

Uninstall(neutron, event)
{
    gametouninstall := event.target.getAttribute("id")
    MsgBox 0x4, Remove game, Would you like to remove %gametouninstall%?
    
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
