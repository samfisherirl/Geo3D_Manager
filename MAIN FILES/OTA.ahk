#include JSON.ahk 
#include Downloader.ahk 
SetWorkingDir, %A_ScriptDir% 

global gh_repo = "Flugan/Geo3D-Release"
global file_to_download = "Geo3D." ; .v1.1.2.zip
global file_to_saving = "Geo3D." ; v1.1.2
global currentvers := A_Appdatacommon "\geo3d\currentvers.txt"
global currentvers1 := A_Appdatacommon "\geo3d\currentvers1.txt"
global DirLocal := A_AppDataCommon "\geo3d"
global 3DScriptDir := A_ScriptDir "\geo3d"

class OTA
{

    checkupd()
    {
        jsonStr := JSON.GetFromUrl("https://api.github.com/repos/" gh_repo "/releases/latest")
        if IsObject(jsonStr) 
        {
            MsgBox, % jsonStr[1]
            Return
        }
        if (jsonStr = "")
        Return
        obj := JSON.Parse(jsonStr)
        latest_tag := obj.tag_name
        change_log := obj.body
        if (version != latest_tag)
        {
            MsgBox, 68,, New version of Geo3D manager.`n`nLatest version: %latest_tag%`nChangelog:`n`n%change_log%`n`n`nDo you want to download?
            IfMsgBox, Yes 
                updater:=OTA.download(latest_tag)
        }
    }


    download(value)
    {
        global currentvers
        global currentvers1
        global DirLocal  
        file_to_download := file_to_download value ".zip"
        download_url := "https://github.com/" gh_repo "/releases/download/" value "/" file_to_download 
        
        UrlDownloadToFile, %download_url%, %file_to_saving%%value%-%value%.zip  
        FileCreateDir, %DirLocal% 
        FileDelete, %currentvers1%
        FileDelete, %currentvers%
        FileAppend, 
(
,%value%,
), %currentvers1%
        Sleep, 100
        FileMove, %currentvers1%, %currentvers%, 1
        FileCreateDir, %3DScriptDir%
        FileMove, %file_to_saving%%value%-%value%.zip, %3DScriptDir%\%file_to_download%, 1
        Geo3D := 3DScriptDir "\" file_to_download
        bat := 3DScriptDir "\3.bat" 
        write7zbat := "7za x " Geo3D " -o" 3DScriptDir "\ -y -r"
        Sleep, 100
        FileAppend, %write7zbat%, %bat%
        Sleep, 100
        Run, %bat%, %3DScriptDir%
        Sleep, 100
        msgbox, Completed! 
    }


    currentvers()
    {
        global DirLocal
        global currentvers
        global currentvers1
        if FileExist(currentvers)
        {
        Loop, Read, %currentvers%
            {   
                if (A_LoopReadLine="")
                    continue
                else
                {
                   A1:=StrSplit(A_LoopReadLine, ",") ;OTA.runcheck()
                   current:=A1[2]
                   OTA.runcheck(current)
                }
            }
        }
        else
            OTA.checkupd()
    }

    
    runcheck(version)
    { 
        jsonStr := JSON.GetFromUrl("https://api.github.com/repos/" gh_repo "/releases/latest")
        if IsObject(jsonStr) 
        {
            MsgBox, % jsonStr[1]
            Return
        }
        if (jsonStr = "")
        Return
        obj := JSON.Parse(jsonStr)
        latest_tag := obj.tag_name
        change_log := obj.body
        if (version != latest_tag)
        {
            MsgBox, 68,, New version of Geo3D.`n`nLatest version: %latest_tag%`nChangelog:`n`n%change_log%`n`n`nDo you want to download update?
            IfMsgBox, Yes
                OTA.download(latest_tag)
        }
        else
            {
                global updater:="no"
            } 
    }
}

Geo3DDL()
{
    FileDelete, version.txt
    UrlDownloadToFile, http://flugan.net/version.txt, version.txt
    ;https://drive.google.com/u/0/uc?id=1xxLSVrRLxKhmajD1WVAPrQNa6xyJ8Tau&export=download template for how to download from gdrive direct

    Loop, Read, version.txt
    {
        if (A_Index=1)
        {
            versionstring := A_LoopReadLine
        }
    }
    LocalVersion := A_AppDataCommon "\geo3d\version.txt"
    if FileExist(LocalVersion)
    {
    Loop, Read, %LocalVersion%
    {
        if (A_Index=1)
        {
            version2 := A_LoopReadLine
        }
    } 
    versionstring := StrSplit(versionstring, ",")
    version := versionstring[1]
    if (version = version2)
        goto, leaver4 

    }
    else 
    {
        msgbox, Update needed, press okay and be patient
        versionstring := StrSplit(versionstring, ",")
        version := versionstring[1]
        FileAppend, %version%, %LocalVersion%
    }
    GDID := StrSplit(versionstring, "/")
    versID := GDID[6]
    updatelocation := A_ScriptDir "\Geo3D\Geo3DUpdate.zip"
    updatefolder := A_ScriptDir "\Geo3D\"
    FileCreateDir, %updatefolder%
    FileDelete, %updatelocation%  
    sleep, 500
    finallink := "https://drive.google.com/u/0/uc?id=" versID "&export=download"
    url := finallink
    target := updatelocation
    download(url, target) 
     
    7zbat := A_ScriptDir "\Geo3D\2.bat"
    FileDelete, %7zbat%
    7zlog := A_ScriptDir "\output.txt"
    Geo3D := "Geo3D"
    write7zbat := "7za x " updatelocation " -o" updatefolder "\ -y -r"
    FileDelete, %7zbat%
    FileDelete, %7zlog%
    FileAppend, %write7zbat%, %7zbat%
    Run, %7zbat%, %updatefolder%
    leaver4:
}