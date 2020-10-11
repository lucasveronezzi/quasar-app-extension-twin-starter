const menuItems = [
  {
    name: 'Home',
    link: '/',
    icon: 'las la-home'
  },
  {
    name: 'Item 1',
    link: '/item-1',
    icon: 'lab la-vuejs'
  },
  {
    name: 'Item 2',
    icon: 'las la-ambulance',
    child: [
      {
        name: 'Sub Item 1',
        link: '/item-2/sub-item-1'
      },
      {
        type: 'separator'
      },
      {
        name: 'Sub Item 2',
        link: '/item-2/sub-item-2'
      }
    ]
  },
  {
    name: 'Item 3',
    link: '/item-3',
    icon: 'las la-calendar'
  },
  {
    type: 'separator'
  },
  {
    name: 'Sair do Sistema',
    action: 'logout',
    icon: 'las la-sign-out-alt'
  }
]

export default menuItems
