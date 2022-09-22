/*
	This example is designed to show how to use the default Neutron template
	page. Because it uses the default template, it is also the simplest example
	to use and tweak as a beginner.
	
	It is also designed to show how you would apply your own theming to the
	template without having to modify it directly, by applying CSS styling to
	the built-in template title bar elements.
*/

#NoEnv
SetBatchLines, -1
global WMI := "WmiData.csv"
global CSV := [] 
global Delim := `""""  
 
; Include the Neutron library
#Include Neutron.ahk

html =
( ; html
	<head>
	<link href="bootstrap.min.css" rel="stylesheet" /> 
	</head>
	<h1>Add Geo3D to your Steam Games!</h1> 
	<p>
		This example is designed to show how to use the default Neutron template page.
		Because it uses the default template, it is also the simplest example to use
		and tweak as a beginner.
</p>
<table>
<thead>
<tr></tr>
<th style="width: 50px"> </th>
<th style="width: 20px; text-align: center"></th>
<th style="width: 90px">Game or App</th>
<th style="width: 300px">Location</th> 
</thead>
<tbody id="tabler2">
<tr>
<td align="center"> <a class="btn btn-outline-danger"
		onclick="ahk.Uninstall(event)" id="gamename"><em
			class="fa fa-trash"></em></a> </td>
<td class="hidden-xs" style="text-align: center">
	<input class="" type="checkbox" id="checkboxNoLabel" value=""
		aria-label="" />
</td>
<td>Your game Here!</td>
<td>C:\theuser\system32\deditatedwam</td>
</tr> 
</tbody></table>
	 <p>
		It is also designed to show how you would apply your own theming to the
		template without having to modify it directly, by applying CSS styling to
		the built-in template title bar elements.
	</p>
	<h2>Example Button</h2>
	<button onclick="ahk.Clicked(event)">Click Me!</button>
	<h2>Example Form</h2>
	<form onsubmit="ahk.Submitted(event)">
		<label for="firstName">First Name:</label>
		<input type="text" id="firstName" placeholder="John" required>
		<br>
		<label for="lastName">Last Name:</label>
		<input type="text" id="lastName" placeholder="Smith" required>
		<br>
		<button type="submit">Submit</button>
	</form>
	<h2>Add Geo3D to your Steam Games</h2> 
	<button onclick="ahk.Clicked(event)">Click Me!</button>
)

css =
( ; css	
	.main {
		background: #353535;
    color: white;
	}
	header {
		background: #333;
		color: white;
	}
	button {
		align-items: center;
		background-image: linear-gradient(144deg,#AF40FF, #5B42F3,#00DDEB);
		border: 0;
		border-radius: 8px;
		box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
		box-sizing: border-box;
		color: #FFFFFF;
		display: flex;
		font-family: Phantomsans, sans-serif;
		font-size: 20px;
		justify-content: center;
		line-height: 1em;
		min-width: 140px;
		padding: 19px 24px;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;
		cursor: pointer;
	  }
	  
	  button:active,
	  button:hover {
		outline: 0;
	  }
	  
	  @media (min-width: 768px) {
		.button {
		  font-size: 24px;
		  min-width: 196px;
		}
	  }
	input.chex {
		width: 20px;
		height: 20px;
		margin-top: 6px;
	}
	header {
		background: #000000;
		color: blue;
	}
	.chex {
		padding-top: 5px;
		text-align: center;
		vertical-align: baseline; 
	}
	.main {
		background: #17193f;
		color: white;
	}
	.title-btn {
		padding: 0.35em 1em;
		cursor: pointer;
		vertical-align: bottom;
		font-family: Webdings;
		font-size: 11pt;
	}

	body .title-btn-restore {
		display: none;
	}

	body.neutron-maximized .title-btn-restore {
		display: block;
	}

	body.neutron-maximized .title-btn-maximize {
		display: none;
	}


)

js =
( ; js
	// Write some JavaScript here
)

title = Neutron Template Example

; Create a Neutron Window with the given content and save a reference to it in
; the variable `neutron` to be used later.
neutron := new NeutronWindow(html, css, js, title)

; Use the Gui method to set a custom label prefix for GUI events. This code is
; equivalent to the line `Gui, name:+LabelNeutron` for a normal GUI.
neutron.Gui("+LabelNeutron")

; Show the GUI, with an initial size of 640 x 480. Unlike with a normal GUI
; this size includes the title bar area, so the "client" area will be slightly
; shorter vertically than if you were to make this GUI the normal way.
neutron.Show("w740 h480")
looker := "steam"
LT.loopCSV(looker) 
; Set up a timer to demonstrate making dynamic page updates every so often. 
return

; The built in GuiClose, GuiEscape, and GuiDropFiles event handlers will work
; with Neutron GUIs. Using them is the current best practice for handling these
; types of events. Here, we're using the name NeutronClose because the GUI was
; given a custom label prefix up in the auto-execute section.
NeutronClose:
ExitApp
return


class LT
{
	loopCSV(Looker) {
		global WMI, CSV, x, Delim
		Games := [] 
		x:=1
		Loop, Read, %WMI%
		{
			if InStr(A_LoopReadLine, Looker)
			{
				CSV := StrSplit(A_LoopReadLine, ",")
				A1 := CSV[3]
				A1 := StrReplace(A1, Delim) 
				string := []
				string := StrSplit(A1, "\") 
				max := string.MaxIndex()
				min1 := max - 1
				min2 := max - 2
				min3 := max - 3
				string := string[min3] "\" string[min2] "\" string[min1] "\" string[max] "\" 
				Games[x] := string
				x:=x+1
			}
		}	


		msgbox, x


		LT.CompileHtml(Games, x)
	}

	CompileHtml(Games, x) {
		global neutron
		sep := "`n"
		tabler :=""
		loop, %x% {
			current := Games[A_Index]
				tabler=
(
%tabler%
<tr>
<td align="center"> 
<a class="" onclick="ahk.Uninstall(event)" id="%current%" name="%current%"><em class="fa fa-trash"></em></a>
</td>
<td class="hidden-xs" style="text-align: center">
<input class="chex" type="checkbox" id="%current%" value="%current%" aria-label="%current%" />
</td>
)
		tabler := tabler . "<td>" . current . "</td>" . sep
		. "<td>" . "</td>" . sep
		. "</tr>" 
		}
		neutron.doc.getElementById("tabler2").innerHTML := 
		neutron.doc.getElementById("tabler2").innerHTML := tabler
		;neutron.qs("#tabler2").innerHTML := ""
		;neutron.qs("#tabler2").innerHTML := tabler
		msgbox, x
	}	
}
 
Clicked(neutron, event)
{
	; event.target will contain the HTML Element that fired the event.
	; Show a message box with its inner text.
	MsgBox, % "You clicked: " event.target.innerText
}

Submitted(neutron, event)
{
	; Some events have a default action that needs to be prevented. A form will
	; redirect the page by default, but we want to handle the form data ourself.
	event.preventDefault()
	
	; Dismiss the GUI
	neutron.hide()
	
	; Use the GetFormData helper to get an associative array of the form data
	formData := neutron.GetFormData(event.target)
	MsgBox, % "Hello " formData.firstName " " formData.lastName "!"
	
	; Re-show the GUI
	neutron.Show()
}

DynamicContent()
{
	; This function isn't called by Neutron, so we'll have to grab the global
	; Neutron window variable instead of using one from a Neutron event.
	global neutron
	
	; Get the mouse position
	MouseGetPos, x, y
	
	; Update the page with the new position
	neutron.doc.getElementById("ahk_x").innerText := x
	neutron.doc.getElementById("ahk_y").innerText := y
}
