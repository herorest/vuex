import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations'

const createStore = () => {
    return new Vuex.Store({
        state:{
            currentCharacter:{},
            currentHouse:{},
            currentProduct:{},
            houses:[],
            cities:[],
            characters:[],
            products:[],
            user:null,
            orders:[]
        },
        getters,
        actions,
        mutations
    });
}

export default createStore;
