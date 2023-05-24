import { JikanResourceTitle } from "@tutkli/jikan-ts";

export default function getJpTitle(titles:JikanResourceTitle[]):string{
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const {type,title} = resourceTitle;
        if (type==="Japanese"){
            return title;
        }
    }
    return "";
}