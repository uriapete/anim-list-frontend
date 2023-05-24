import { JikanResourceTitle } from "@tutkli/jikan-ts";

export default function titleArrToTitleListStr(titles:JikanResourceTitle[]):string{
    return titles.map((resource, idx) => {
        // setting string var for individual resource
        let titleStr: string = resource.title;

        // if our curr resource is not the first on our list...
        // add a space " " before the resource name
        if (idx > 0) {
            titleStr = " " + titleStr;
        }

        // map gives an array of returned vars, so we'll add our resource strings to the list
        return titleStr;

        // and then join the array together for the final display
    }).join();

    // the join() func will add the commas for us, but not add them when there's only one, which is nice
}