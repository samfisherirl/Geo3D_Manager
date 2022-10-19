
lib.msg()

class Lib {
      msg()
      {
        Title := "Importing Steam Library...", Sec := 4
        SetTimer, Countdown2, 1000
        MsgBox, 64, %Title%, Importing Steam Library in... %Sec% seconds, %Sec%
      Return

      Countdown2:
        if (Sec=<1)
        {
          Exitapp
        }
        ControlSetText, Static2, % "Importing Steam Library in... " (Sec:=Sec-1) " seconds", %Title% ahk_class #32770
      return
    }
    SteamImport() {
      global CSVer:= A_ScriptDir "\WmiData.csv"
      FileDelete, %CSVer%
      powershell=
      (
        Get-ChildItem -Path HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | ? { -not [string]::IsNullOrEmpty($_.DisplayName) } | Sort-Object -Property DisplayName | Select-Object -Property DisplayName, DisplayVersion, InstallLocation | Export-Csv -Path .\WmiData.csv -NoTypeInformation
      )
      Run, powershell -NoExit -Command "%powershell%",,Min
      lib.msg()
      ;Run, *RunAs "powershell" -Command "&{%powershell%}"
      Winclose, Windows PowerShell
      lib.looper()
    }
    looper() {
      global
      steamlog := A_ScriptDir "\transcoded_steam_library.txt"
      Loop, Read, %CSVer%
      {
        loop, parse,A_LoopReadLine, `,
          ; parse string
        {
          A:=[]
          A:=StrSplit(A_LoopField, "\")
          Loop, % A.Length()
          {
            if InStr(A[A_index], "SteamLibrary")
              c.= "======>" A_LoopReadLine "`n"
          }
        }
      }
      msgbox %c%
      filedelete, %steamlog%
      fileappend, %c%, %steamlog%
      run, %steamlog%
    }
  }