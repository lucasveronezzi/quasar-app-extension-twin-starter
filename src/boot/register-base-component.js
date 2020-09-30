import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // Look for files in the current directory
  'src/components/base',
  // Do not look in subdirectories
  true,
  // Only include "_base-" prefixed .vue files
  /\.vue$/
)

export default ({ Vue }) => {
  requireComponent.keys().forEach(fileName => {
    // Pega a configuração do componente
    const componentConfig = requireComponent(fileName)

    // Obtém nome em PascalCase do componente
    const componentName = upperFirst(
      camelCase(
        // Obtém o nome do arquivo, independentemente da profundidade da pasta
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

    // Registra o componente globalmente
    Vue.component(
      componentName,
      // Olha para as opções em `.default`, existentes
      // se o componente foi exportado com `export default`,
      // caso contrário usa o módulo raiz.
      componentConfig.default || componentConfig
    )
  })
}
