import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

export default function getProducerListStr(producers:JikanResource[]):string {
    const producerList: string = resourceArrToNameListStr(producers);
    let producerDisp: string = "";
    switch (producers.length) {
        case 1:
            producerDisp = `Producer: ${producerList}`
            break;

        case 0:
            break;

        default:
            producerDisp = `Producers: ${producerList}`
            break;
    }
    return producerDisp;
}