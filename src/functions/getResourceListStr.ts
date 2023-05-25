import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

export default function getResourceListStr(resources:JikanResource[],resourceName:string,resourcePlural?:string):string {
    const resourceList: string = resourceArrToNameListStr(resources);
    let resourceDisp: string = "";
    switch (resources.length) {
        case 1:
            resourceDisp = `${resourceName}: ${resourceList}`
            break;

        case 0:
            break;

        default:
            resourceDisp = `${resourcePlural?resourcePlural:`${resourceName}s`}: ${resourceList}`
            break;
    }
    return resourceDisp;
}