import { JikanResourceTitle } from "@tutkli/jikan-ts";

// function for getting the title of an anime in a specified language
export default function getLangTitle(titles: JikanResourceTitle[], language: string): string {

    // loops thru array of titles.
    // there should only be one title per lang, others should be marked synonym
    // so, first in arr to have a lang that matches with specified should get returned
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const { type, title } = resourceTitle;
        if (type === language) {
            return title;
        }
    }
    // else, return empty string
    return "";
}