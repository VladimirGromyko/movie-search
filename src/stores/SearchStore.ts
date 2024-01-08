import {defineStore} from "pinia";
import {MovieType, useMovieStore} from "./MovieStore";

const url =
    "https:api.themoviedb.org/3/search/movie?api_key=9dce159afab59a22c51bcc574d302840&query=";
type SearchStoreType = {
    loader: boolean,
    movies: MovieType[]
}
export const useSearchStore = defineStore('searchStore', {
    state: ():SearchStoreType => ({
        loader: false,
        movies: []
    }),
    actions: {
        async getMovies(search: string) {
            this.loader = true
            const res = await fetch(`${url}${search}`)
            const data = await res.json()
            this.movies = data.results
            this.loader = false
        },
        addToUserMovies(object: MovieType) {
            const movieStore = useMovieStore()
            movieStore.movies.push({...object, isWatched: false})
            movieStore.activeTab = 1
        }
    },
})