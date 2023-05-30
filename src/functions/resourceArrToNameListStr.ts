import { JikanResource } from "@tutkli/jikan-ts";

// function for turning an arr of JikanResources to one string listing their names
// ex. Studio1, Studio2, Studio3
export default function resourceArrToNameListStr(resources: JikanResource[]): string {
    return resources.map((resource, idx) => {
        // setting string var for individual resource
        let nameStr: string = resource.name;

        // if our curr resource is not the first on our list...
        // add a space " " before the resource name
        if (idx > 0) {
            nameStr = " " + nameStr;
        }

        // map gives an array of returned vars, so we'll add our resource strings to the list
        return nameStr;

        // and then join the array together for the final display
    }).join();

    // the join() func will add the commas for us, but not add them when there's only one, which is nice
}