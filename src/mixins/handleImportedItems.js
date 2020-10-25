export default {
  data () {
    return {
      itemsOpened: []
    }
  },

  created () {
    this.listItems = []

    this.items.forEach(item => {
      // Verifica se o item possui ACL declarado, e se possuir verifica se o usuário tem permissão
      if (this.$store.getters['Auth/checkAcl'](item.acl)) {
        let x = false
        const childs = []

        // Faz um loop nos itens filho do menu, caso o item tenha
        if (item.child) {
          item.child.forEach(child => {
            // Verifica se foi declarado um ACL para o item filho, e caso tenha, verifica se o usuário tem permissão
            if (this.$store.getters['Auth/checkAcl'](child.acl)) {
              childs.push(child)

              // Verifica se a rota atual pertence ao link do item filho
              // Caso true, insere true na possição do index do item para a variavel itemsOpened, para que
              // o menu pai fique aberto caso a rota atual seja de um dos itens filhos
              if (child.link === this.$route.path) {
                x = true
              }
            }
          })
        }

        if (childs.length > 0) {
          item.child = childs
        }

        if (!item.child || childs.length > 0) {
          this.listItems.push(item)

          this.itemsOpened.push(x)
        }
      }
    })
  }
}
