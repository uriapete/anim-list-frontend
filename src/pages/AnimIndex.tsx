import { FormEvent, ReactElement, useEffect, useState } from "react";
import { AnimeClient,JikanResponse,Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";

const animeClient= new AnimeClient();


// interface AnimSearchProps{
//     searchTerm:string;
// }

// function AnimSearch(props:AnimSearchProps):ReactElement{
//     const {searchTerm}=props;
//     // const animData:JikanResponse<Anime[]> = await searchAnim(searchTerm);
//     // console.log(animData);
//     return(
//         <div className="anim-search">

//         </div>
//     )
// }

export default function AnimIndex():ReactElement {
    const s:string= useLocation().search;
    // const [search, setSearch] = useState(new URLSearchParams(s).get("s"));
    const search = new URLSearchParams(s).get("s");
    
    const searchStr:string|null = search;
    
    const [holdSearch,setHoldSearch]=useState("");
    
    function updateSearchOnInput(e:FormEvent<HTMLInputElement>) {
        setHoldSearch(e.currentTarget.value);
    }
    // console.log(search)
    
    const navigate:NavigateFunction=useNavigate();
    
    function handleSearchSubmit(e:FormEvent) {
        e.preventDefault();
        // console.log("submit!")
        // return redirect("/uwu");
        navigate(`/?s=${holdSearch}`)
        // navigate(`/?s=test`)
    }

    const initSearchData:Anime[]=[];

    const [searchData,setSearchData]=useState(initSearchData);

    async function getAnimSearch(searchTerm: string) {
        const searchData:JikanResponse<Anime[]> = await animeClient.getAnimeSearch({
            q: searchTerm
        })
        setSearchData(searchData.data);
        // return searchData;
    }

    useEffect(()=>{
        try {
            if(search){
                getAnimSearch(search);
            }
        } catch (error) {
            console.log(error)
        }
    },[search])


    return(
        <div className="AnimIndex">
            <Container className="search-container">
                <Form className="search" onSubmit={handleSearchSubmit}>
                    <Form.Group className="" as={Row} controlId="search-bar">
                        <Form.Label column xs="auto" sm="2">
                            Search: 
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" size="sm" name="search" onInput={updateSearchOnInput}/>
                        </Col>
                        <Col xs="auto" sm="2">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            {searchStr ? searchData.map((anime,idx)=>{
                return(
                    <article key={idx} className="anime-search-result">
                        <img src={anime.images.jpg.image_url} alt={`${anime.title_english} poster`} className="anime-img" />
                        <h3 className="anime-title anime-title-en">{anime.title_english}</h3>
                        <h6 className="anime-title anime-title-jp">{anime.title_japanese}</h6>
                        <h6 className="studios">Studios: {anime.studios.map((studio,idx)=>{
                            let studStr:string=studio.name;
                            if (idx>0){
                                studStr=" "+studStr;
                            }
                            return studStr;
                        }).join()}</h6>
                        <p className="anime-synop">{anime.synopsis}</p>
                    </article>
                )
            }) : <h1>No search uwu</h1>}
        </div>
    );
}