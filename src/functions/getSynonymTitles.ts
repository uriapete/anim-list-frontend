import { JikanResourceTitle } from "@tutkli/jikan-ts";

export default function getSynonymTitles(titles:JikanResourceTitle[]):JikanResourceTitle[]{
    let synTitles:JikanResourceTitle[]=[];
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const {type} = resourceTitle;
        if (type==="Synonym"){
            synTitles.push(resourceTitle);
        }
    }
    return synTitles;
}