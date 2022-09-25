class FunctionObject {
    __Call(method, args*) {
        if (method = "")
            return this.Call(args*)
        if (IsObject(method))
            return this.Call(method, args*)
    }
}
;The following example defines a function array which can be called; when called, it calls each element of the array in turn.

; This example requires the FunctionObject class above in order to work.
class FuncArrayType extends FunctionObject {
    Call(obj, params*) {
        ; Call a list of functions.
        Loop % this.Length()
            this[A_Index].Call(params*)
    }
}

; Create an array of functions.
funcArray := new FuncArrayType
; Add some functions to the array (can be done at any point).
funcArray.Push(Func("One"))
funcArray.Push(Func("Two"))
; Create an object which uses the array as a method.
obj := {method: funcArray}
; Call the method.
obj.method("foo", "bar")

One(param1, param2) {
    ListVars
    MsgBox
}
Two(param1, param2) {
    ListVars
    MsgBox
}
