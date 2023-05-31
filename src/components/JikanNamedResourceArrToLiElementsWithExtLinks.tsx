import { ReactElement } from "react";
import JikanNamedResourceArrToLiElementsWithLinksProps from "../interfaces/JikanNamedResourceArrToLiElementsWithLinksProps";

export default function JikanNamedResourceArrToLiElementsWithExtLinks(props: JikanNamedResourceArrToLiElementsWithLinksProps): ReactElement {
    const { resourceList } = props;

    // basically, just returns Arr of ReactElements<li> of named resources out of an Arr of Named Resources
    return (
        <>
            {/* map thru */}
            {resourceList.map((resource, idx) => {
                return (
                    // basically: -name <--link
                    <li key={idx} className="jk-resource"><a href={resource.url} rel="noreferrer noopener" target="_blank">{resource.name}</a></li>
                )
            })}
        </>
    )
}