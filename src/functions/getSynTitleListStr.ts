import { JikanResourceTitle } from "@tutkli/jikan-ts";
import getSynonymTitles from "./getSynonymTitles";
import titleArrToTitleListStr from "./titleArrToTitleListStr";

export default function getSynTitleListStr(titles:JikanResourceTitle[]):string {
    const titleList: string = titleArrToTitleListStr(getSynonymTitles(titles));
    let synTitleDisp: string = "";
    switch (titles.length) {
        case 1:
            synTitleDisp = `Other title: ${titleList}`
            break;

        case 0:
            break;

        default:
            synTitleDisp = `Other titles: ${titleList}`
            break;
    }
    return synTitleDisp;
}