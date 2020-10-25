import { registerSyncModules } from 'twin-starter/utils/modules-static'

export default ({ store, router }) => {
    registerSyncModules({ store, router })
}
