leng:=initial()
msgbox, %leng%
msgbox % a98.path()
  initial(){

    global a
    a:=[]
    Loop, %A_MyDocuments%\*.* {
      a%A_Index% := new File([A_LoopFileName,A_LoopFileFullPath,A_Index])
      
      length := A_Index
    }
    return length
  }
  
class File
{
  __New(a) {
    this.names := a[1]
    this.paths := a[2]
    this.identity := a[3]
  }
  Name() {
    return this.names
  }
  Path() {
    return this.paths
  }
  ID(){
    return this.identity
  }

}
