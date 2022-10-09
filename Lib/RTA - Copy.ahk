

global gh_rep = "artumino/VRScreenCap"
global file_to_DL = "vr-screen-cap.exe"
global file_to_Save = "vr-screen-cap"


class RTA
{

    checkupd()
    {
        jsonStr := JSON.GetFromUrl("https://api.github.com/repos/" gh_rep "/releases/latest")
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
                updater:=RTA.download(latest_tag)
        }
    }


    
    download(value)
    {
        global Logger
        global Logger1
        global DirLocal  
        download_url := "https://github.com/" gh_rep "/releases/download/" value "/" file_to_DL 
        UrlDownloadToFile, %download_url%, %file_to_Save%-%value%.exe  
        FileCreateDir, %DirLocal% 
        FileMove, %file_to_Save%-%value%.exe, %DirLocal%\%file_to_DL%, 1
        FileCreateShortcut, %DirLocal%\%file_to_DL%,  %A_Desktop%\VR_Screen_Cap.lnk, %DirLocal%,"%A_ScriptFullPath%",,,
        msgbox, Completed! 
    }


    currentvers()
    {
        global DirLocal
        global Logger
        if FileExist(Logger)
        {
        Loop, Read, %Logger%
            {   
                if (A_LoopReadLine="")
                    continue
                else
                {
                   A1:=StrSplit(A_LoopReadLine, ",") ;RTA.runcheck()
                   current:=A1[1]
                   RTA.runcheck(current)
                }
            }
        }
        else
            global updater := "never"
    }

    
    runcheck(version)
    { 
        jsonStr := JSON.GetFromUrl("https://api.github.com/repos/" gh_rep "/releases/latest")
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
            MsgBox, 68,, A new version of Artum 'VR Screen Cap' is available.`n`nLatest version: %latest_tag%`nChangelog:`n`n%change_log%`n`n`nDo you want to download update?
            IfMsgBox, Yes
                RTA.download(latest_tag)
        }
        else
            {
                global updater:="no"
            } 
    }
}

