import { JikanResourceTitle } from "@tutkli/jikan-ts";

export default function getEnTitle(titles:JikanResourceTitle[]):string{
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const {type,title} = resourceTitle;
        if (type==="English"){
            return title;
        }
    }
    return "";
}