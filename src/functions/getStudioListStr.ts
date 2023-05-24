import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

export default function getStudioListStr(studios:JikanResource[]):string {
    const studioList: string = resourceArrToNameListStr(studios);
    let studioDisp: string = "";
    switch (studios.length) {
        case 1:
            studioDisp = `Studio: ${studioList}`
            break;

        case 0:
            break;

        default:
            studioDisp = `Studios: ${studioList}`
            break;
    }
    return studioDisp;
}