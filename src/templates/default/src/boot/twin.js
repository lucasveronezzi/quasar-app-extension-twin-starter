// IF YOU ARE USING THIS FILE, DON'T FORGET TO PUT IN 'quasar.config.js' INSIDE 'boot'
import { addLoginCallback, addLoadUserCallback } from 'twin-starter/utils/auth'

export default ({ store }) => {
  addLoadUserCallback(data => {
    // Modify the data the way you want and update the store with the data
    // IMPORTANT: remember that user.permissions need to be a array of strings or object with the value being the permission string
    // Example:
    // 
    // let permissions = []
    // let roles = data.response.user.roles
    // Object.keys(roles).forEach(role => {
    //  role.permissions.forEach( permission => permissions.push(permission) )
    // })
    // 
    // store.commit('twin/auth/setPermissions', permissions)
    // 
    // If you don't want save the roles in user, you can delete to not keep memory allocation without need
    // 
    // delete data.response.user.roles
    //
    // store.commit('twin/auth/setUser', {
    //   id: data.response.user.id,
    //   name: data.response.user.name,
    //   email: data.response.user.email,
    //   address: data.response.user.address
    // })
  })

  addLoginCallback(async data => {
    // This function is async if need call a request API to load more data
    // 
    // If your login send data and you need modify the data that this plugin saved in the store
    // you can do like the example above in addLoadUserCallback
    // 
    // If the login route don't return the data from user you can call loadUser to load the user data
    //
    // await store.dispatch('twin/auth/loadUser')
  })
}
