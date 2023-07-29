import axios from 'axios'
const state = {
    objSearch: {
        startPlaceName: "",
        endPlaceName: "",
        startTime: "",
        fromPeriod: "",
        toPeriod: "",
        period: "",
        fromPrice: "",
        toPrice: ""
    },
    tours: [],
    tour: null,
    toursDiscount: [],
    toursRecommend: [],
    placeAdvertisment: []
}

// getters
const getters = {
    getObjSearch: (state) => {
        // let result = []
        // state.resOperationManuals.filter((item) => {
        //     result.push(item)
        // })
        return state.objSearch
    },
    getTours: (state) => {
        return state.tours
    },
    getTour: (state) => {
        return state.tour
    },
    getToursDiscount: (state) => {
        return state.toursDiscount
    },
    getToursRecommend: (state) => {
        return state.toursRecommend
    },
    getPlaceAdvertisment: (state) => {
        return state.placeAdvertisment
    }

}

// mutations
const mutations = {
    setObjSearch: (state, payload) => {
        state.objSearch = {
            startPlaceName: payload.startPlaceName,
            endPlaceName: payload.endPlaceName,
            startTime: payload.startTime,
            fromPeriod: payload.fromPeriod,
            toPeriod: payload.toPeriod,
            period: payload.period,
            fromPrice: payload.fromPrice,
            toPrice: payload.toPrice
        }
    },
    setTours: (state, payload) => {
        state.tours = payload
    },
    setTour: (state, payload) => {
        state.tour = payload
    },
    setToursDiscount: (state, payload) => {
        state.toursDiscount = payload
    },

    setPlaceAdvertisment: (state, payload) => {
        state.placeAdvertisment = payload
    },

}
// actions
const actions = {
    setObjSearch({ commit }, filter) {
        commit('setObjSearch', filter)
        console.log(filter)
    },

    async getTours({ commit }, item) {
        const data = await axios.post(`http://localhost:8091/api/v1/tour-list`,item)
        if (data.status == 200) {
            commit('setTours', data.data)
        }
    },
    async getTour({ commit }, id) {
        const data = await axios.get(`http://localhost:8091/api/v1/tour-detail/${id}`)
        if (data.status == 200) {
            commit('setTour', data.data)
        }
    },
    async getToursDiscount({ commit }) {
        const data = await axios.get(`http://localhost:8091/api/v1/tour-discount`)
        if (data.status == 200) {
            commit('setToursDiscount', data.data)
        }
    },

    async getPlaceAdvertisment({ commit }) {
        const data = await axios.get(`http://localhost:8091/api/v1/place-advertisment`)
        if (data.status == 200) {
            commit('setPlaceAdvertisment', data.data)
        }
    },

    async getToursRecommend({ commit }) {
        let url = `http://103.174.213.91:8089/api/v1/tours/recommend`
        if(localStorage.getItem('userId') !== null){
            url = `http://103.174.213.91:8089/api/v1/tours/recommend?userId=${localStorage.getItem('userId')}`
        }
        const data = await axios.get(url)
        if (data.status == 200) {
            commit('setToursRecommend', data.data)
        }
    }
    // async exportData({ commit }, filter) {
    //     return axios.get(`${apiURL._API_URL}res-operation-manual/export/excel?fromDate=${filter.fromDate}&toDate=${filter.toDate}?riverBasin=${filter.riverBasin}&river=${filter.river}&reservoir=${filter.reservoir}&fileType=${filter.fileType}`, { responseType: 'blob' })

    // },
    // async getFileTemplate({ commit }) {
    //     return axios.get(`${apiURL._API_URL}res-operation-manual/file-template`, { responseType: 'blob' })

    // },
    // async importFile({ commit }, item) {
    //     return axios.post(`${apiURL._API_URL}res-operation-manual/import`, item, { responseType: 'blob' })
    // },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}