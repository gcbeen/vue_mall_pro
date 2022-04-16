export default {
    state: {
        name: '哪吒'
    },
    mutations: {
        updateName(state, payload) {
            state.name = payload
        }
    },
    getters: {
        fullName(state) {
            return state.name + '三太子'
        }
    },
    actions: {
        updateNameAction(context) {
            return new Promise((resolve) => {
                console.log(context);
                setTimeout(() => {
                    context.commit('updateName', '金吒')
                }, 1000)
            })
        }
    }
}