import { Movie } from "./Movie";
import { MovieRoom } from "./MovieRoom";

export class ShowTime{
    constructor(private startTime:string,
                private endTime:string,
                private price:number,
                private movieRoom : MovieRoom,
                private movie: Movie,
    ) {}
}