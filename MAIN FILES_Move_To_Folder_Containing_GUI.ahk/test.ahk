class File {
	__New( Input ) {  
		this.game := Input[2] 
		this.byte := Input[3] 
		this.dxgi := Input[4] 
		this.dxil := Input[5]   ;and there it will set the path to the value we need
	}
	getGame() { 
		return this.game
	}
	getByte() {   
		return this.byte
	}
	getDXV() { ;same as getDirectory
		return this.dxgi
	}
	getDxil() { 
		return this.dxil
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