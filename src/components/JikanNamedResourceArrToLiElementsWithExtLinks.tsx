import { ReactElement } from "react";
import JikanNamedResourceArrToLiElementsWithLinksProps from "../interfaces/JikanNamedResourceArrToLiElementsWithLinksProps";

export default function JikanNamedResourceArrToLiElementsWithExtLinks(props:JikanNamedResourceArrToLiElementsWithLinksProps):ReactElement{
    const {resourceList} = props;
    return(
        <>
            {resourceList.map((resource,idx)=>{
                return(
                    <li key={idx} className="jk-resource"><a href={resource.url} rel="noreferrer noopener" target="_blank">{resource.name}</a></li>
                )
            })}
        </>
    )
}