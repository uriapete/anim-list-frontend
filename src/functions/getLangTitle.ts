import { JikanResourceTitle } from "@tutkli/jikan-ts";

export default function getLangTitle(titles:JikanResourceTitle[],language:string):string{
    for (let i = 0; i < titles.length; i++) {
        const resourceTitle = titles[i];
        const {type,title} = resourceTitle;
        if (type===language){
            return title;
        }
    }
    return "";
}