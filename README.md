# MoeList!
A React app showing off some anime.

### Why?
One may be new to anime or is bored and in the mood to browse the medium. This site is a simple way just to do just that.

### How?
Using Jikan-TS, a TypeScript wrapper for Jikan, an unofficial API of MyAnimeList, for retrieving show data and information, and React as a frontend, the site aims to be quick and easy to use.

### Where is it?
You can find it [here](https://anime-moelist.netlify.app/)!

## User Stories
### MVP
As a user, I want to be able to...
- [x] Search up a show by title and see results in order to be able to find information easily
- [x] See detailed information about shows in order to be able to know what the show is about
### Stretch/Extra
As a user, I want to be able to...
- [ ] Login or signup in order to be able to access features of this site without my work being overwritten by someone else
- [ ] Save shows to a list in order to track what I want to watch and which I have already watched
- [ ] Add comments to a show in order to signal to others whether I recommend this show or not
- [ ] Add logs to a show in order to detail my experience watching something publicly if I want

## Wireframes
![Image of a simple wireframe-work of how the MoeList index page would look - a blue background with a white active main section, with purple accents. A selection of multiple shows under the searchbar is shown.](./md-assets/wireframes/home-search.v001.png)
![Image of a simple wireframe-work of how a MoeList show page would look - a blue background with a white active main section, with purple accents. Information about a particular show is shown.](./md-assets/wireframes/article.v002.png)

## Screenshots
### Site for mobile
![An image of the MoeList site's mobile homepage, featuring "Attack on Titan: The Final Season - Final Chapters" as a featured front page card](md-assets/screenshots/mobile-home.png)
![An image of the MoeList site's mobile search results page, featuring "KonoSuba: God's Blessing on This Wonderful World!" as one of the search results](md-assets/screenshots/mobile-search.png)
![An image of the MoeList site's mobile anime show page, featuring "Oshi no Ko"](md-assets/screenshots/mobile-show.png)
### Site for desktop
![An image of the MoeList site's desktop homepage, featuring "Attack on Titan: The Final Season - Final Chapters" as a featured front page card](md-assets/screenshots/desktop-home.png)
![An image of the MoeList site's desktop search results page, featuring "KonoSuba: God's Blessing on This Wonderful World!" as one of the search results](md-assets/screenshots/desktop-search.png)
![An image of the MoeList site's desktop anime show page, featuring "Oshi no Ko"](md-assets/screenshots/desktop-show.png)

## Technologies used
- TypeScript - language
- React - front end
- React Router - easy dynamic routing with React without refreshing
- Bootstrap-React - CSS framework based on Bootstrap made to work specifically with React
- Node.js - Deployment + package dependency handling
- Jikan - API for fetching data - wrapped in Jikan-TS
- Jikan-TS - Jikan wrapper built for TypeScript, with built in types to take advantage of TypeScript strong typing

