import { useState, useEffect } from "react";

// code idea gotten from https://tigeroakes.com/posts/resize-event-alternatives/#1-media-queries

// use css style width media queries instead of resize event listeners because event listeners kill performance by being called every damn frame the window is resized

export default function useDesktopWidthQuery(): boolean {
    // init a query that watches if the window width is desktop size
    const desktopWidthQuery = matchMedia("(min-width: 800px)");

    // create a state for whether or not the win is desk-size, init with current value of whether or not width is desktop size
    const [desktopScreen, setDesktopScreen] = useState<boolean>(desktopWidthQuery.matches);

    // use an effect that adds a listener that will change the desktopScreen state on change of the query
    // this function should only be called on the break point, similar to css media queries
    // unlike the other function, which changes on every resize, with sucks
    useEffect(() => {
        desktopWidthQuery.addEventListener("change", () => {
            setDesktopScreen(desktopWidthQuery.matches)
        })
    }, [desktopWidthQuery])

    return desktopScreen;
}