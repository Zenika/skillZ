
import { SlidingCheckbox } from "../atoms/SlidingCheckbox";
import { useState, useEffect } from "react";

export const TutorialMode = ({ t }: {t : (path: string) => string}) => {
    const values: [any, any] = [false, true];
    const [tutorialMode, setTutorialMode] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem("demo") === "true")
            setTutorialMode(true)
        else
            setTutorialMode(false)
    }, []);

    function changeTutorialMode() {
        
    }

    return(
        <>
        <div className="cursor" onClick={() => changeTutorialMode()}>
          <span>{t("sidepanel.botNotifications")}</span>
          <ul className="flex flex-row justify-around">
            <li>
                <SlidingCheckbox
                  selectedValue={tutorialMode}
                  values={values}
                />
            </li>
            <li>🦮</li>
          </ul>
        </div>
        </>
    )
};