import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

export default function getLicensorListStr(licensors:JikanResource[]):string {
    const licensorList: string = resourceArrToNameListStr(licensors);
    let licensorDisp: string = "";
    switch (licensors.length) {
        case 1:
            licensorDisp = `Licensor: ${licensorList}`
            break;

        case 0:
            break;

        default:
            licensorDisp = `Licensors: ${licensorList}`
            break;
    }
    return licensorDisp;
}