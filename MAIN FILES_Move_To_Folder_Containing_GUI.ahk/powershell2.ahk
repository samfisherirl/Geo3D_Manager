

class LT
{
	loopCSV(Looker) {
		global WMI, CSV, x, Delim
	Loop, Read, %WMI%
	{
		if InStr(A_LoopReadLine, Looker)
		{
			CSV := StrSplit(A_LoopReadLine, ",")
			A1 := CSV[3]
			Games[x] := StrReplace(A1, Delim) 
			x++
		}
	}	
	LT.CompileHtml(Games, x)
	msgbox, x
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
<a class="btn btn-danger" onclick="ahk.Uninstall(event)" id="%current%" name="%current%"><em class="fa fa-trash"></em></a>
</td>
<td class="hidden-xs" style="text-align: center">
<input class="chex" type="checkbox" id="%current%" value="" aria-label="" />
</td>
)
		tabler := tabler . "<td>" . current . "</td>" . sep
		. "<td>" . current . "</td>" . sep
		. "</tr>" 
		}
		neutron.doc.getElementById("tabler2").innerHTML := 
		neutron.doc.getElementById("tabler2").innerHTML := tabler
		;neutron.qs("#tabler2").innerHTML := ""
		;neutron.qs("#tabler2").innerHTML := tabler
		msgbox, x
	}	
}