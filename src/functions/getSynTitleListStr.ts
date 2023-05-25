import { JikanResourceTitle } from "@tutkli/jikan-ts";
import getSynonymTitles from "./getSynonymTitles";
import titleArrToTitleListStr from "./titleArrToTitleListStr";

// basically get resource str but for alt titles
// as data types are different
export default function getSynTitleListStr(titles: JikanResourceTitle[]): string {
    const synTitleArr: JikanResourceTitle[] = getSynonymTitles(titles)
    const titleList: string = titleArrToTitleListStr(synTitleArr);
    let synTitleDisp: string = "";
    switch (synTitleArr.length) {
        case 1:
            synTitleDisp = `Alternative title: ${titleList}`
            break;

        case 0:
            break;

        default:
            synTitleDisp = `Alternative titles: ${titleList}`
            break;
    }
    return synTitleDisp;
}