import { ReactElement } from "react";
import AnimeShortProps from "../interfaces/AnimeShortProps";
import { Link } from "react-router-dom";
import "./styles/AnimeShort.css"
import getJpTitle from "../functions/getJpTitle";

export default function AnimeShort(props: AnimeShortProps):ReactElement{

    // getting vars out of props
    const{anime,additionalClassNames,idx}=props;

    // processing additional class names
    let additionalClasses:string="";
    if(additionalClassNames){
        additionalClasses=" "+additionalClassNames;
    }

    // part for handling synopsis

    // var for synopsis
    let synop: string = "";

    // if synopsis exists:
    if (anime.synopsis !== null && anime.synopsis !== "" && typeof anime.synopsis !== "undefined") {
        // defining at what amt of chars we'll break the synopsis
        // mobile size first:
        let breakLength: number = 250;

        // if desktop, bigger breaklength
        if (window.innerWidth >= 500) {
            breakLength = 700
        }

        // if synopsis length exceeds breaklength...
        if (anime.synopsis.length > breakLength) {
            // var for index of where to break/slice string
            let breakCharIdx: number = breakLength + 1;

            // var for holding whether or not a space " " char was found
            let spaceFound: boolean = false

            // start loop at breaklength, and work back down
            for (let i = breakLength + 1; i > 0; i--) {
                // defining char
                const char = anime.synopsis[i];

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
            synop = anime.synopsis.slice(0, breakCharIdx) + "...";
        } else {
            // if synopsis is short and length does not exceed breaklength
            // just set it as is
            synop = anime.synopsis
        }
    }
    { console.log(anime.titles) }

    // getting japanese title
    const jpTitle:string=getJpTitle(anime.titles);
    // animes should always have jp title available, i think

    // now for the actual display
    return (
        <Link className="anime-short-link" to={`anime/${anime.mal_id}`}>
            {/* // article which contains anime img, titles, studios */}
            <article key={idx ? idx : null} className={"anime-short" + additionalClasses}>
                {/* div that contains the picture */}
                <div className="anime-img anime-short-img short-item">
                    <img src={anime.images.jpg.large_image_url} width={"250vw"} alt={`${anime.title_english} poster`} className="anime-img" />
                </div>

                {/* div that contains the text */}
                <div className="anime-text short-item">

                    {/* displaying title */}
                    {/* first default title */}
                    <h3 className="anime-title anime-title-default">{anime.titles[0].title}</h3>
                    {/* then display the jp title */}
                    {jpTitle!==""?(<h6>{jpTitle}</h6>):false}

                    {/* displaying studios */}
                    {/* begin looping thru studios */}
                    <h6 className="studios">Studios: {anime.studios.map((studio, idx) => {
                        // start map loop, studio (no s, individual) refers to current studio in our arr of studios

                        // setting string var for individual studio
                        let studStr: string = studio.name;

                        // if our curr studio is not the first on our list...
                        // add a space " " before the studio name
                        if (idx > 0) {
                            studStr = " " + studStr;
                        }

                        // map gives an array of returned vars, so we'll add our studio strings to the list
                        return studStr;

                        // and then join the array together for the final display
                    }).join()}</h6>
                    {/* the join() func will add the commas for us, but not add them when there's only one, which is nice */}

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