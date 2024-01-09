import {defineStore} from 'pinia'
import {computed, ref, Ref} from "vue";

export type MovieType = {
    id: number,
    original_title: string,
    overview: string
    poster_path: string,
    release_date: string,
    isWatched: boolean,
}

export const useMovieStore = defineStore('movieStore', () => {
    const movies: Ref<MovieType[]> = ref([])
    const activeTab = ref(2)
    const watchedMovies= computed(() => {
            return movies.value.filter((el) => el.isWatched)
    })
    const totalCountMovies = computed(() => {
            return movies.value.length
    })
    const setActiveTab = (id: number) => (activeTab.value = id)
    const toggleWatched = (id: number) => {
            const idx = movies.value.findIndex((el) => el.id === id)
            movies.value[idx].isWatched = !movies.value[idx].isWatched
    }
    const deleteMovie = (id: number) => (movies.value = movies.value.filter((el) => el.id !== id))

    return {
        movies,
        activeTab,
        watchedMovies,
        totalCountMovies,
        setActiveTab,
        toggleWatched,
        deleteMovie
    }
})