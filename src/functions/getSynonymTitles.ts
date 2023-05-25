import { JikanResourceTitle } from "@tutkli/jikan-ts";

// function for filtering thru titles arr for synonym titles
export default function getSynonymTitles(titles: JikanResourceTitle[]): JikanResourceTitle[] {
    // init return var
    let synTitles: JikanResourceTitle[] = [];

    // loop thru title arr, and push synonyms to arr, then return
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const { type } = resourceTitle;
        if (type === "Synonym") {
            synTitles.push(resourceTitle);
        }
    }
    return synTitles;
}