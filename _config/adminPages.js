export default {
  accounts: {
    permission: 'iaccount.accounts.manage',
    activated: true,
    authenticated: true,
    path: '/account/account/index',
    name: 'qaccount.admin.accounts',
    crud: import('modules/qaccount/_crud/accounts'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iaccount.cms.sidebar.adminAccount',
    icon: 'fa-light fa-file-user',
    subHeader: {
      refresh: true,
    },
  },
};
