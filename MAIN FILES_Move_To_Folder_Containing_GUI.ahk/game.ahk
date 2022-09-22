class Games {
	__New(Input) { 
            LineSplit:=[]
			LineSplit := StrSplit(Input, ",")
			this.path := LineSplit[2]
			this.name := LineSplit[3]  ;and there it will set the path to the value we need
	}
	getPath() { 
		return this.path
	}
	getPathName() {  
		SplitPath, % this.name, fileName
		return fileName
	}
}


class G3DFiles {
	__New(Input) { 
            LineSplit:=[]
			LineSplit := StrSplit(Input, ",")
			this.path := LineSplit[2]
			this.name := LineSplit[3]  ;and there it will set the path to the value we need
	}
	getPath() { 
		return this.path
	}
	getPathName() {  
		SplitPath, % this.name, fileName
		return fileName
	}
}

	/*
	getPathDir() { ;same as getDirectory
		return This.getPathDirectory()
	}
    
	getPathDirectory() {
		SplitPath, % this.name, , fileDirectory
		return fileDirectory
	}
	getPathExtension() {
		SplitPath, % this.name , , , fileExtension
		return fileExtension
	}
	getPathNameNoExtension() {
		SplitPath, % this.name, , , , fileNameNoExtension
		return fileNameNoExtension
	}
	getPathDrive() {
		SplitPath, % this.name, , , , , fileDrive
		return fileDrive
	}
	move( newFilePath, overwrite := 1 ) {
		FileMove, % this.name, % newFilePath, % overwrite
	}
	copy( newFilePath, overwrite := 1 ) {
		FileCopy, % this.name, % newFilePath, % overwrite
	}
	open( p* ) {
		return FileOpen( this.name, p* )
	}
	getSize( unit := "" ) {
		FileGetSize, fileSize, % this.name, % unit
		return fileSize
	}
	getAttributes() { ;flag string see AutoHotkey Help: FileExist for more infos
		return FileExist( this.name )
	}
	changeAttributes( changeAttributeString ) { ;see FileSetAttrib for more infos
		FileSetAttrib, % changeAttributeString, % this.name
	}
	getTimeAccessed() { ;in YYYYMMDDHH24MISS see AutoHotkey help for more infos
		FileGetTime, timeCreated, % this.name, A
		return timeCreated
	}
	setTimeAccessed( timeStamp ) {
		FileSetTime, % timeStamp, % this.name, A
	}
	getTimeModified() {
		FileGetTime, timeCreated, % this.name, M
		return timeCreated
	}
	setTimeModified( timeStamp ) {
		FileSetTime, % timeStamp, % this.name, M
	}
	getTimeCreated() {
		FileGetTime, timeCreated, % this.name, C
		return timeCreated
	}
	setTimeCreated( timeStamp ) {
		FileSetTime, % timeStamp, % this.name, C
	}
	delete() {
		FileDelete, % this.name
	}
}