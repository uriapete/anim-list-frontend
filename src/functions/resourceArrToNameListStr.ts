import { JikanResource } from "@tutkli/jikan-ts";

export default function resourceArrToNameListStr(resources:JikanResource[]):string{
    return resources.map((resource, idx) => {
        // setting string var for individual resource
        let studStr: string = resource.name;

        // if our curr resource is not the first on our list...
        // add a space " " before the resource name
        if (idx > 0) {
            studStr = " " + studStr;
        }

        // map gives an array of returned vars, so we'll add our resource strings to the list
        return studStr;

        // and then join the array together for the final display
    }).join();

    // the join() func will add the commas for us, but not add them when there's only one, which is nice
}