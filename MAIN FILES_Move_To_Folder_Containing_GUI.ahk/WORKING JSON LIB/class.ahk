class Github {
	__New(Repo) { 
		Username := Repo[1]
		Release := Repo[2]
		Rep := Username "/" Release
        url := "https://api.github.com/repos/" Rep "/releases/latest"
		UrlDownloadToFile,%url%,1.json
		FileRead, Jsn, 1.json
		data := json_load(Jsn)
        this.j := data["assets"][1]["browser_download_url"]
		
	}
	getAsset() { 
		return this.j
	}
	getDL() {   
        msgbox % this.j[1].assets.browser_download_url
		return fileName
	}
}

class UI {
	GU() {
		global USER, REPO, action
		action := "0"
		Gui Add, Button, gGO  x192 y104 w80 h21, GO-BABY-GO
		Gui Add, Edit, vUSER x16 y24 w120 h16, samfisherirl
		Gui Add, Text, x192 y24 w120 h16 +0x200, Username
		Gui Add, Edit, vREPO x16 y64 w120 h16, Geo3D_Manager
		Gui Add, Text, x192 y64 w120 h16 +0x200, Repo (no spaces)
		Gui Add, Button, gRet x24 y104 w112 h21, return Release URL
		Gui Show, w351 h148, Download Latest Git Release
		Return

		Ret:
		GuiControlGet, USER
		GuiControlGet, REPO
		global Array2:=[]
		global action := "1"
		Array2[1]:=USER
		Array2[2]:=REPO 
		return

		GO:
		GuiControlGet, USER
		GuiControlGet, REPO
		global Array2:=[]
		global action := "2"
		Array2[1]:=USER
		Array2[2]:=REPO 
		return
		

				
		GuiEscape:
		GuiClose:
			ExitApp

		}
}