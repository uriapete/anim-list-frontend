import { ReactElement } from "react";
import AnimeShortProps from "../interfaces/AnimeShortProps";
import { Link } from "react-router-dom";
import "./styles/AnimeShort.css"
import getResourceListStr from "../functions/getResourceListStr";
import getLangTitle from "../functions/getLangTitle";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";

// checks if supplied data is JikanResponse<Anime>
function isJkResp(data: Anime | JikanResponse<Anime>): data is JikanResponse<Anime> {
    return "data" in data;
}

export default function AnimeShort(props: AnimeShortProps): ReactElement {

    // getting vars out of props
    const { anime, additionalClassNames, idx } = props;

    // processing additional class names
    let additionalClasses: string = "";
    if (additionalClassNames) {
        additionalClasses = " " + additionalClassNames;
    }

    // if anime is null, it's still loading
    if (anime === null) {
        return (
            <article className={"anime-short" + additionalClasses}>
                <h1>Loading...</h1>
            </article>
        )
    }

    // process anime into Anime data, if it's a JikanResponse, get the data, if not then it's alread ready for use
    let animeData: Anime = isJkResp(anime) ? anime.data : anime;

    // part for handling synopsis

    // var for synopsis
    let synop: string = "";

    // if synopsis exists:
    if (animeData.synopsis !== null && animeData.synopsis !== "" && typeof animeData.synopsis !== "undefined") {
        // defining at what amt of chars we'll break the synopsis
        // mobile size first:
        let breakLength: number = 250;

        // if desktop, bigger breaklength
        if (window.innerWidth >= 800) {
            breakLength = 600;
        }

        // if synopsis length exceeds breaklength...
        if (animeData.synopsis.length > breakLength) {
            // var for index of where to break/slice string
            let breakCharIdx: number = breakLength + 1;

            // var for holding whether or not a space " " char was found
            let spaceFound: boolean = false

            // start loop at breaklength, and work back down
            for (let i = breakLength + 1; i > 0; i--) {
                // defining char
                const char = animeData.synopsis[i];

                // if space was not found...
                if (!spaceFound) {
                    // if char is a space, indicate so and go to next iteration
                    if (char === " ") {
                        spaceFound = true;
                        continue;
                    } else {
                        // else, go to next iteration
                        continue;
                    }
                } else {
                    // this code only runs if a space has been found before
                    if (char !== " ") {
                        // if char is not a space, set the breaking index to the char after it
                        // which should be a space and therefore not included in the split string
                        breakCharIdx = i + 1;

                        // then break
                        break;
                    } else {
                        // if char is still a space, continue to next iteration
                        continue;
                    }
                }
            }
            // set synop var to split string, add "..."
            synop = animeData.synopsis.slice(0, breakCharIdx) + "...";
        } else {
            // if synopsis is short and length does not exceed breaklength
            // just set it as is
            synop = animeData.synopsis
        }
    }

    // getting japanese title
    const jpTitle: string = getLangTitle(animeData.titles, "Japanese");
    // animes should always have jp title available, i think

    // now for the actual display
    return (
        <Link className="anime-short-link" to={`anime/${animeData.mal_id}`}>
            {/* // article which contains anime img, titles, studios */}
            <article key={idx ? idx : null} className={"anime-short" + additionalClasses}>
                {/* div that contains the picture */}
                <div className="anime-img anime-short-img short-item">
                    <img src={animeData.images.jpg.large_image_url} width={"250vw"} alt={`${animeData.title_english} poster`} className="anime-img" />
                </div>

                {/* div that contains the text */}
                <div className="anime-text short-item">

                    {/* displaying title */}
                    {/* first jp title */}
                    <h3 className="anime-title anime-title-jp">{jpTitle}</h3>
                    {/* then display the default and en titles */}
                    <h5 className="anime-title anime-title-default">{animeData.titles[0].title}</h5>
                    {animeData.titles[0].title === getLangTitle(animeData.titles, "English") ? "" : 
                    <h6 className="anime-title anime-title-en">{getLangTitle(animeData.titles, "English")}</h6>}

                    {/* displaying studios */}
                    {/* begin looping thru studios */}
                    <h6 className="studios">{getResourceListStr(animeData.studios, "Studio")}</h6>

                    {/* displaying synopsis */}
                    {/* 
                        the synopsis has already been proccessed above
                        if there is a synopsis, it would've been assigned to synop and cut if it was too long
                        if there wasn't a synopsis, synop would be "", which is falsy
                    */}
                    {/* therefore: if synop is defined, display it */}
                    {/* if not, display "none available" message */}
                    {synop ? (<p className="anime-synop">{synop}</p>) : (<p>No synopsis available.</p>)}
                </div>
            </article>
        </Link>
    )
}