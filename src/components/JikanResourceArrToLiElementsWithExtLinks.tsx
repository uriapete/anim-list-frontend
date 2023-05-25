import { ReactElement } from "react";
import JikanResourceArrToLiElementsWithLinksProps from "../interfaces/JikanResourceArrToLiElementsWithLinksProps";

export default function JikanResourceArrToLiElementsWithExtLinks(props:JikanResourceArrToLiElementsWithLinksProps):ReactElement{
    const {resourceList} = props;
    return(
        <>
            {resourceList.map((resource,idx)=>{
                return(
                    <li className="jk-resource"><a href={resource.url} rel="noreferrer noopener" target="_blank">{resource.name}</a></li>
                )
            })}
        </>
    )
}