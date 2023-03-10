import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            table: null,
            user: null,
            file: null
        }
    },
    mutations: {
        changeTable (state, n) {
            state.table = n
        },
        changeUser (state, u) {
            state.user = u
        },
        changeFile (state, f) {
            state.file = f
        }
    }
})


