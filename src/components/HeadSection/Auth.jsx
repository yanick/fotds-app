import fp from 'lodash/fp';

import React from 'react';
import { connect } from 'react-redux';

import Actions from '../../store/actions';

import NotLogged from './Auth/NotLogged';

const Logged = connect(
    null, 
    dispatch => ({
        logout: () => dispatch(Actions.logout()),    
    }),
)(
    ({player_name, logout}) => <div>
   Admiral { player_name } <a href="#" onClick={ logout }>logout</a>
</div>
);

const Auth = ({player}) => <div id="auth_section">
    { player 
        ? <Logged player_name={ player }/>
        : <NotLogged /> 
    }
</div>;


const mapStateToProps = state => ({
    player: fp.get('user.player')(state)
});

export default connect( mapStateToProps )(Auth);


// <template>
//     <div id="auth_section">
//         <div v-if="auth_token">
//             {{ player_name }} <a href="#" @click="logout">logout</a>
//         </div>
//         <div v-else>
//             <input type="text" placeholder="player name" v-model="player" />
//             <input type="text" placeholder="password"    v-model="password" />
//             <a href="#" @click="authUser">log in</a>
//             <div v-if="is_processing_auth">logging in...</div>
//         </div>
//     </div>
// </template>

// <script>
// import { mapActions, mapGetters } from 'vuex';

// export default {
//     methods: mapActions([ 'authUser', 'logout' ]),
//     computed: {
//         ...mapGetters([ 'is_processing_auth', 'auth_token', 'player_name' ]),
//         player: {
//             get () {
//                 return this.$store.state.user.player
//             },
//             set (value) {
//                 this.$store.commit('updatePlayer', value)
//             }
//         },
//         password: {
//             get () {
//                 return this.$store.state.user.password
//             },
//             set (value) {
//                 this.$store.commit('updatePassword', value)
//             }
//         }
//     }
// };
// </script>