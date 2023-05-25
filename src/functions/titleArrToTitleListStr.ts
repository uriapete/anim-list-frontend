import { JikanResourceTitle } from "@tutkli/jikan-ts";

// a version of resourcearr... for titles, because those interfaces are slightly different
// usually you wouldn't use this for the entire title arr, this is probs just used for an already filtered arr of synonym titles

export default function titleArrToTitleListStr(titles: JikanResourceTitle[]): string {
    return titles.map((title, idx) => {
        // setting string var for individual title
        let titleStr: string = title.title;

        // if our curr title is not the first on our list...
        // add a space " " before the title name
        if (idx > 0) {
            titleStr = " " + titleStr;
        }

        // map gives an array of returned vars, so we'll add our title strings to the list
        return titleStr;

        // and then join the array together for the final display
    }).join();

    // the join() func will add the commas for us, but not add them when there's only one, which is nice
}