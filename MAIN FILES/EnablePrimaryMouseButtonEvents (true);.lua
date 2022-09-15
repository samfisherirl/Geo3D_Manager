LC=1
RC=3

function NoRecoil()
    MoveMouseRelative(0, 5)
    Sleep(9)
end

EnablePrimaryMouseButtonEvents(true);
function OnEvent(event, arg)
    if IsMouseButtonPressed(RC) then
        repeat
            if (event == "MOUSE_BUTTON_PRESSED" and arg == LC) then
                Sleep(100)
                repeat
                    NoRecoil()
                until (event == "MOUSE_BUTTON_RELEASED" and arg == LC)
            else
                sleep(5)
            end
        until not IsMouseButtonPressed(RC)
    end
    if IsMouseButtonPressed(LC) then
        repeat
            if (event == "MOUSE_BUTTON_PRESSED" and arg == RC) then
                Sleep(100)
                repeat
                    NoRecoil()
                until (event == "MOUSE_BUTTON_RELEASED" and arg == LC)
            else
                sleep(5)
            end 
        until not IsMouseButtonPressed(RC)
    end
end
