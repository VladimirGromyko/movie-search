import {defineStore} from "pinia";
import {MovieType, useMovieStore} from "./MovieStore";
import {Ref, ref} from "vue";

const url =
    "https://api.themoviedb.org/3/search/movie?api_key=9dce159afab59a22c51bcc574d302840&query=";

export const useSearchStore = defineStore('searchStore', () => {
    const loader = ref(false)
    const movies: Ref<MovieType[]> = ref([])
    const getMovies = async (search: string)=> {
        loader.value = true
        const res = await fetch(`${url}${search}`)
        const data = await res.json()
        movies.value = data.results
        loader.value = false
    }
    const addToUserMovies = (object: MovieType) => {
        const movieStore = useMovieStore()
        movieStore.movies.push({...object, isWatched: false})
        movieStore.activeTab = 1
    }
    return {
        loader,
        movies,
        getMovies,
        addToUserMovies
    }
})