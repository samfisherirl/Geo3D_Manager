function recoil()
    MoveMouseRelative(0,10)
    Sleep(10.0) 
end

EnablePrimaryMouseButtonEvents  (true);
function OnEvent(event,arg)
    if IsKeyLockOn("capslock")then
        if IsMouseButtonPressed(3)then
            repeat
                if IsMouseButtonPressed(1) then
                    Sleep(600)
                    repeat
                        MoveMouseRelative(0,10)
                        Sleep(10.0)  -- Change this for amount of recoil. 5 = my pubg/insurgency recoil. 13 is csgo. Less is more recoil accounting. 
                    until not IsMouseButtonPressed(1)
                end
            until not IsMouseButtonPressed(3)
        end
    end
end
