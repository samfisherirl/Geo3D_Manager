

download(url, target) {
 Global prog
 FileGetSize, bytesNow, %target%
 If (bytesNow = bytes := HttpQueryInfo(url, 5)) {
  MsgBox, 64, Done, File sizes match. Aborting.
  Return
 } Else FileRecycle, %target%
 Gui, Progress:New
 Gui, Font, s10
 Gui, Add, Text,, %url%
 Gui, Add, Progress, w400 h20 cBlue vprog
 Gui, Add, Text,, %target%
 Gui, Show,, Downloading
 SetTimer, GetSize, 250
 UrlDownloadToFile, %url%, %target%
 err := ErrorLevel
 SetTimer, GetSize, Off
 Gui, Destroy
 If err
  MsgBox, 48, Error, An error occurred during downloading.
 Else MsgBox, 64, Done, Done!
 Return
 GetSize:
 Gui, Progress:Default
 FileGetSize, bytesNow, %target%
 If pct := Round(100 * bytesNow / bytes) {
  Gui, Show,, Downloading %fn% (%pct%`%)
  GuiControl,, prog, %pct%
 }
 Return
}

HttpQueryInfo(URL, QueryInfoFlag=21, Proxy := "", ProxyBypass := "") {
 ; https://autohotkey.com/board/topic/10384-download-progress-bar/
 hModule := DllCall("LoadLibrary", "str", dll := "wininet.dll")
 ver := (A_IsUnicode && !RegExMatch(A_AhkVersion, "\d+\.\d+\.4") ? "W" : "A")
 InternetOpen := dll "\InternetOpen" ver, HttpQueryInfo := dll "\HttpQueryInfo" ver
 InternetOpenUrl := dll "\InternetOpenUrl" ver, AccessType := Proxy > "" ? 3 : 1
 io_hInternet := DllCall(InternetOpen, "str", "", "uint", AccessType, "str", Proxy
                       , "str", ProxyBypass, "uint", 0)
 If (ErrorLevel || io_hInternet = 0) {
  DllCall("FreeLibrary", "uint", hModule)
  Return -1
 } Else iou_hInternet := DllCall(InternetOpenUrl, "uint", io_hInternet, "str", url, "str", ""
                       , "uint", 0, "uint", 0x80000000, "uint", 0)
 If (ErrorLevel || iou_hInternet = 0) {
  DllCall("FreeLibrary", "uint", hModule)
  Return -1
 } Else VarSetCapacity(buffer, 1024, 0), VarSetCapacity(buffer_len, 4, 0)
 Loop, 5 {
  hqi := DllCall(HttpQueryInfo, "uint", iou_hInternet, "uint", QueryInfoFlag, "uint", &buffer
               , "uint", &buffer_len, "uint", 0)
  If (hqi = 1) {
    hqi = success
    Break
  }
 }
 If (hqi = "success") {
  p := &buffer
  Loop {
   l := DllCall("lstrlen", "UInt", p), VarSetCapacity(tmp_var, l+1, 0)
   DllCall("lstrcpy", "Str", tmp_var, "UInt", p)
   p += l + 1
   res .= tmp_var
   If (*p = 0)
    Break
  }
 } Else SetEnv, res, timeout
 DllCall("wininet\InternetCloseHandle",  "uint", iou_hInternet)
 DllCall("wininet\InternetCloseHandle",  "uint", io_hInternet)
 DllCall("FreeLibrary", "uint", hModule)
 Return res
}