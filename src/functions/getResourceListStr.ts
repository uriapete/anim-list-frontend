import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

// fn for displaying resources in the format of:
// Resource(s): r1, r2, r3, etc

export default function getResourceListStr(resources: JikanResource[], resourceName: string, resourcePlural?: string): string {
    // format the list part of the string
    const resourceList: string = resourceArrToNameListStr(resources);

    // init return var
    let resourceDisp: string = "";

    // the switch determines whether or not we use a plural
    // depending on the length of our arr...
    switch (resources.length) {
        // if there's only one resource, no plural
        case 1:
            resourceDisp = `${resourceName}: ${resourceList}`
            break;

        // if there's no resources, we'll return an empty string
        case 0:
            break;

        // when both don't match, this should run, which means there's multiple resources in our list
        // then we use the plural
        default:
            // we have a plural param, but it's optional. if it's supplied, we use it, else we add an 's' to the supplied name of the resource, which is required.
            resourceDisp = `${resourcePlural ? resourcePlural : `${resourceName}s`}: ${resourceList}`
            break;
    }
    return resourceDisp;
}