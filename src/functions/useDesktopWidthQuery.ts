import { useState,useEffect } from "react";

export default function useDesktopWidthQuery():boolean {
    const desktopWidthQuery = matchMedia("(min-width: 800px)");

    const [desktopScreen, setDesktopScreen] = useState<boolean>(desktopWidthQuery.matches);

    useEffect(() => {
        desktopWidthQuery.addEventListener("change", () => {
            setDesktopScreen(desktopWidthQuery.matches)
        })
    }, [desktopWidthQuery])

    return desktopScreen;
}