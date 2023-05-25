import { useState,useEffect } from "react";
// i got this solution from first answer in https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// basically what i want to do is to get the window dims
// i could just window.innerwidth/height but i want to use a hook for dynamic live updating and avoid refreshes

function getWindowDimensions(){
    // just returns current window width and heihgt
    const { innerHeight, innerWidth } = window;
    return {innerWidth,innerHeight};
}

export default function useWindowDimensions(){
    
    // init with innerheight and width
    // and use state with windims
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(()=>{
        // define functs inside so react won't complain about dependencies

        // fn to handle resize
        // just gets new windims
        function handleResize(){
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize",handleResize);
    })

    return windowDimensions;
}