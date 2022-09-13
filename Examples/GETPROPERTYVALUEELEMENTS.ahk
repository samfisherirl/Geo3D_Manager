UIA_Interface functions:
UIA_Interface(maxVersion="") ; Creates a new UIAutomation object, or returns a previously created one. maxVersion can be specified to limit the highest used IUIAutomation version (for Windows 10 this currently is 7). Most applications can use IUIAutomation2, but since higher IUIAutomation versions can use all the methods and properties of the lower ones, usually the highest version can be used.
UIA_Enum(e) ; Returns a constant/enumeration from the UIA_Enum class (which can also be used directly). If a constant starts with "UIA_", that can be omitted. Example: UIA_Enum("ButtonControlTypeId") returns 50000.
UIA_CreateEventHandler(funcName, handlerType="") ; Creates a new event handler object that calls funcName when the appropriate event is received (after calling a Add...EventHandler method). handlerType should be left empty when using AddAutomationEventHandler, in other cases specify the EventHandler name (possible options: FocusChanged, StructureChanged, TextEditTextChanged, Changes, Notification), eg for AddFocusChangedEventHandler specify "FocusChanged".

UIA_Base class properties (apply for the UIA_Interface object, and for all sub-objects suchs as elements etc):
UIA_Base.TrueCondition ; Contains the return value for CreateTrueCondition, for more convenient use
UIA_Base.TreeWalkerTrue ; Contains a TreeWalker created with TrueCondition, for more convenient use

class UIA_Interface
UIA_Interface.CreateCondition(property, val) ; Wrapper function for CreatePropertyCondition. Property can be either the number or text from UIA_PropertyIds (PROPERTY part of UIA_PROPERTYPropertyId). 
; cUIA.CreateCondition("Name", "Username") ; Creates a new property condition using UIA_NamePropertyId with the value of "Username"
UIA_Interface.SmallestElementFromPoint(x="", y="", activateChromiumAccessibility=True) ; Gets ElementFromPoint and filters out the smallest subelement that is under the specified point.

class UIA_Element
UIA_Element.CurrentValue ; This property gets or sets the current value of the element. This is a wrapper for GetCurrentPropertyValue("Value") and SetValue()
UIA_Element.CurrentExists ; Checks if the element stills exists
UIA_Element.WaitNotExist(timeOut=10000) ; Wait until the element doesn't exist, with a default timeOut of 10000ms (10 seconds). Returns 1 if the element doesn't exist, otherwise 0.
UIA_Element.GetClickablePointRelativeTo(relativeTo="") { ; Wrapped for the GetClickablePoint function, that converts the coordinates according to the mode selected with relativeTo. relativeTo can be window, screen or client, default is A_CoordModeMouse.
UIA_Element.GetParentHwnd() ; Gets the hwnd for the parent window. A more reliable way would be to use CurrentProcessId with ahk_pid.
UIA_Element.SetValue(val, pattern="") ; Set element value using Value pattern, or as a fall-back using LegacyIAccessible pattern. If a pattern is specified then that is used instead.
/*
	UIA_Element.Click
	Click using one of the available click-like methods (InvokePattern Invoke(), TogglePattern Toggle(), ExpandCollapsePattern Expand() or Collapse() (depending on the state of the element), SelectionItemPattern Select(), or LegacyIAccessible DoDefaultAction()), in which case ClickCount is ignored. If WhichButton is specified (for example "left", "right") then the native mouse Click function will be used to click the center of the element.
	If WhichButton is a number, then Sleep will be called with that number. Eg Click(200) will sleep 200ms after clicking
	If ClickCountAndSleepTime is a number >=10, then Sleep will be called with that number. To click 10+ times and sleep after, specify "ClickCount SleepTime". Ex1: Click("left", 200) will sleep 200ms after clicking. Ex2: Click("left", "20 200") will left-click 20 times and then sleep 200ms.
	If Relative is "Rel" or "Relative" then X and Y coordinates are treated as offsets from the current mouse position. Otherwise it expects offset values for both X and Y (eg "-5 10" would offset X by -5 and Y by +10).
*/
UIA_Element.Click(WhichButtonOrSleepTime="", ClickCountAndSleepTime=1, DownOrUp="", Relative="")
; ControlClicks the element after getting relative coordinates with GetClickablePointRelativeTo("window"). Specifying WinTitle makes the function faster, since it bypasses getting the Hwnd from the element.
; If WinTitle or WinText is a number, then Sleep will be called with that number of milliseconds. Ex: ControlClick(200) will sleep 200ms after clicking. Same for ControlClick("ahk_id 12345", 200)
UIA_Element.ControlClick(WinTitleOrSleepTime="", WinTextOrSleepTime="", WhichButton="", ClickCount="", Options="", ExcludeTitle="", ExcludeText="")
UIA_Element.GetSupportedPatterns() ; Get available patterns for the element. Use of this should be avoided, since it calls GetCurrentPatternAs for every pattern. A better option is PollForPotentialSupportedPatterns
UIA_Element.GetCurrentPos(relativeTo="") ; Returns an object containing the x, y coordinates and width and height: {x:x coordinate, y:y coordinate, w:width, h:height}. relativeTo can be client, window or screen, default is A_CoordModeMouse.
UIA_Element.GetChildren(scope=0x2) ; By default get only direct children (TreeScope_Children)
UIA_Element.Dump() { ; Returns info about the element: ControlType, Name, Value, LocalizedControlType, AcceleratorKey, AutomationId. 
UIA_Element.DumpAll(maxDepth=20) ; Returns info (ControlType, Name etc) for all descendants of the element. maxDepth is the allowed depth of recursion, by default 20 layers. DO NOT call this on the root element!
/*
	FindFirst using search criteria. 
	expr: 
		Takes a value in the form of "PropertyId=matchvalue" to match a specific property with the value matchValue. PropertyId can be most properties from UIA_Enum.UIA_PropertyId method (for example Name, ControlType, AutomationId etc). 
		
		Example1: "Name=Username:" would use FindFirst with UIA_Enum.UIA_NamePropertyId matching the name "Username:"
		Example2: "ControlType=Button would FindFirst using UIA_Enum.UIA_ControlTypePropertyId and matching for UIA_Enum.UIA_ButtonControlTypeId. Alternatively "ControlType=50000" can be used (direct value for UIA_ButtonControlTypeId which is 50000)
		
		Criteria can be combined with AND, OR, &&, ||:
		Example3: "Name=Username: AND ControlType=Button" would FindFirst an element with the name property of "Username:" and control type of button.

		Flags can be modified for each individual condition by specifying FLAGS=n after the condition (and before and/or operator). 0=no flags; 1=ignore case (case insensitive matching); 2=match substring; 3=ignore case and match substring

		If matchMode==3 or matching substrings is supported (Windows 10 17763 and above) and matchMode==2, then parentheses are supported. 
		Otherwise parenthesis are not supported, and criteria are evaluated left to right, so "a AND b OR c" would be evaluated as "(a and b) or c".
		
		Negation can be specified with NOT:
		Example4: "NOT ControlType=Edit" would return the first element that is not an edit element
	
	scope:
		Scope by default is UIA_TreeScope_Descendants. 
		
	matchMode:
		If using Name PropertyId as a criteria, this follows the SetTitleMatchMode scheme: 
			1=name must must start with the specified name
			2=can contain anywhere
			3=exact match
			RegEx=using regular expression. In this case the Name can't be empty.
	
	caseSensitive:
		If matching for a string, this will specify case-sensitivity.

*/
UIA_Element.FindFirstBy(expr, scope=0x4, matchMode=3)
UIA_Element.FindFirstByName(name, scope=0x4, matchMode=3) ; Wrapper for FindFirst using UIA_NamePropertyId. Scope by default is UIA_TreeScope_Descendants. matchMode follows SetTitleMatchMode scheme: 1=tab name must must start with tabName; 2=can contain anywhere; 3=exact match; RegEx
UIA_Element.FindFirstByType(controlType, scope=0x4) ; Wrapper for FindFirst using UIA_ControlTypePropertyId
UIA_Element.FindFirstByNameAndType(name, controlType, scope=0x4, matchMode=3) ; Wrapper for FindFirst using UIA_NamePropertyId, UIA_ControlTypePropertyId and creating an AND condition for the two.
UIA_Element.FindAllByName(name, scope=0x4, matchMode=3) ; Wrapper for FindAll using UIA_NamePropertyId. Scope by default is UIA_TreeScope_Descendants. matchMode follows SetTitleMatchMode scheme: 1=tab name must must start with tabName; 2=can contain anywhere; 3=exact match; RegEx
UIA_Element.FindAllByType(controlType, scope=0x4) ; Wrapper for FindAll using UIA_ControlTypePropertyId.
UIA_Element.FindAllByNameAndType(name, controlType, scope=0x4, matchMode=3) ; Wrapper for FindAll using UIA_NamePropertyId, UIA_ControlTypePropertyId and creating an AND condition for the two.
UIA_Element.FindByPath(path) ; Gets an element by the "path" that is displayed in the UIA_Element.DumpAll() result. This is similar to the Acc path, but for UIA (they are not compatible). Use of this is discouraged, because usually there are more reliable methods available. Also can be used to get parent elements ("Pn") and sibling elements (+n or -n): "P2.+2.1" would get parent of the parent, and then the second siblings first child.
UIA_Element.WaitElementExist(expr, scope=0x4, matchMode=3, timeOut=10000) ; Calls UIA_Element.FindFirstBy until the element is found and then returns it, with a timeOut of 10000ms (10 seconds)
UIA_Element.WaitElementNotExist(expr, scope=0x4, matchMode=3, caseSensitive=True, timeOut=10000) ; Tries to FindFirstBy the element and if it is found then waits until the element doesn't exist (using WaitNotExist()), with a timeOut of 10000ms (10 seconds). For explanations of the other arguments, see FindFirstBy
UIA_Element.WaitElementExistByName(name, scope=0x4, matchMode=3, timeOut=10000) ; Calls UIA_Element.FindFirstByName until the element is found and then returns it, with a timeOut of 10000ms (10 seconds)
UIA_Element.WaitElementExistByType(controlType, scope=0x4, timeOut=10000) ; Calls UIA_Element.FindFirstByType until the element is found and then returns it, with a timeOut of 10000ms (10 seconds)
UIA_Element.WaitElementExistByNameAndType(name, controlType, scope=0x4, timeOut=10000) ; Calls UIA_Element.FindFirstByNameAndType until the element is found and then returns it, with a timeOut of 10000ms (10 seconds)
UIA_Element.Highlight(displayTime:=2000, color:="Red", d:=4) ; Highlights the element borders for 2 seconds by default.
