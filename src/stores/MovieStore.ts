import {defineStore} from 'pinia'

export type MovieType = {
    id: number,
    original_title: string,
    overview: string
    poster_path: string,
    release_date: string,
    isWatched: boolean,
}
export type MovieStoreType = {
    movies: MovieType[],
    activeTab: number
}
export const useMovieStore = defineStore('movieStore', {
    state: (): MovieStoreType => ({
        movies: [],
        activeTab: 2,
    }),
    getters: {
        watchedMovies(state) {
            return state.movies.filter((el) => el.isWatched)
        },
        totalCountMovies(state) {
            return state.movies.length
        }
    },
    actions: {
        setActiveTab(id: number) {
            this.activeTab = id
        },
        toggleWatched(id: number) {
            const idx = this.movies.findIndex((el) => el.id === id)
            this.movies[idx].isWatched = !this.movies[idx].isWatched
        },
        deleteMovie(id: number) {
            this.movies = this.movies.filter((el) => el.id !== id)
        }
    },
})
