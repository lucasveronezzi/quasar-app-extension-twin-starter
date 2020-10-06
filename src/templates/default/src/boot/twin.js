// IF YOU ARE USING THIS FILE, DON'T FORGET TO PUT IN 'quasar.config.js' INSIDE 'boot'
import { addLoginCallback, addLoadUserCallback } from 'twin-starter/utils/auth'

export default ({ store }) => {
  addLoginCallback(async data => {
    // This function is async if need call a request API to load more data
    // Modify the data the way you want and update the store with the data
    //
    // await axios.post('...')
    //
    // If the login route don't return the data from user you can call loadUser to load the user data
    //
    // await store.dispatch('twin/auth/loadUser')
  })

  addLoadUserCallback(data => {
    // Modify the data the way you want and update the store with the data
    // Example:
    //
    // store.commit('twin/auth/setUser', {
    //   id: data.response.user.id,
    //   name: data.response.user.name,
    //   email: data.response.user.email,
    //   address: data.response.user.address
    // })
    //
    // store.commit('twin/auth/setRoles', data.response.user.roles)
  })
}
