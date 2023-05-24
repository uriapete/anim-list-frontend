import { JikanResourceTitle } from "@tutkli/jikan-ts";
import getSynonymTitles from "./getSynonymTitles";
import titleArrToTitleListStr from "./titleArrToTitleListStr";

export default function getSynTitleListStr(titles:JikanResourceTitle[]):string {
    const synTitleArr: JikanResourceTitle[] = getSynonymTitles(titles)
    const titleList: string = titleArrToTitleListStr(synTitleArr);
    let synTitleDisp: string = "";
    switch (synTitleArr.length) {
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