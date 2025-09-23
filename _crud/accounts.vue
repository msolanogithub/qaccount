<template>
  <!-- Locatables -->
  <master-modal
    v-model="locatableModal.show"
    custom-position
    :title="locatableModal.title"
  >
    <crud
      :crud-data="import('modules/qlocations/_crud/locatables')"
      :custom-data="customLocatable"
    />
  </master-modal>
  <!-- Contact Items -->
  <master-modal
    v-model="contactItemsModal.show"
    custom-position
    :title="contactItemsModal.title"
  >
    <crud
      :crud-data="import('modules/qcontact/_crud/items')"
      :custom-data="customContactItems"
    />
  </master-modal>
</template>
<script>
export default {
  data() {
    return {
      locatableModal: {
        title: this.$tr('iaccount.cms.locatables'),
        show: false,
        row: null,
      },
      contactItemsModal: {
        title: this.$tr('iaccount.cms.contactItems'),
        show: false,
        row: null,
      },
      crudId: this.$uid(),
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qaccount.accounts',
        permission: 'iaccount.accounts',
        create: {
          title: this.$tr('iaccount.cms.newAccount'),
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
              align: 'left',
            },
            {
              name: 'title',
              label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
            },
            {
              name: 'type',
              label: this.$tr('iaccount.cms.accountType'),
              field: 'type',
              align: 'left',
              format: (val) => (val ? val.title : '-'),
            },
            {
              name: 'documentType',
              label: this.$tr('iaccount.cms.documentType'),
              field: 'documentType',
              align: 'left',
              format: (val) => (val ? val.title : '-'),
            },
            {
              name: 'document',
              label: this.$tr('iaccount.cms.document'),
              field: 'document',
              align: 'left',
            },
            {
              name: 'created_at',
              label: this.$tr('isite.cms.form.createdAt'),
              field: 'createdAt',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'actions',
              label: this.$tr('isite.cms.form.actions'),
              align: 'left',
            },
          ],
          actions: [
            {
              name: 'locatables',
              label: this.$tr('iaccount.cms.locatables'),
              icon: 'fa-light fa-map-location-dot',
              action: (row) => {
                this.locatableModal = {
                  title:
                    this.$tr('iaccount.cms.locatables') + ' | ' + row.title,
                  show: true,
                  row,
                };
              },
            },
            {
              name: 'contactItems',
              label: this.$tr('iaccount.cms.contactItems'),
              icon: 'fa-light fa-address-book',
              action: (row) => {
                this.contactItemsModal = {
                  title:
                    this.$tr('iaccount.cms.contactItems') + ' | ' + row.title,
                  show: true,
                  row,
                };
              },
            },
          ],
        },
        update: {
          title: this.$tr('iaccount.cms.updateAccount'),
        },
        delete: false,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
          typeId: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('iaccount.cms.accountType')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qaccount.accountTypes',
              select: { label: 'title', id: 'id' },
            },
          },
          documentTypeId: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('iaccount.cms.documentType')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qaccount.documentTypes',
              select: { label: 'title', id: 'id' },
            },
          },
          document: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('iaccount.cms.document')}*`,
              rules: [
                (val) => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
        },
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    },

    customLocatable() {
      return {
        read: {
          requestParams: {
            filter: {
              entityType: 'Modules\\Iaccount\\Models\\Account',
              entityId: this.locatableModal.row.id,
            },
            include:
              'translations,country.translations,province.translations,city.translations',
          },
        },
        formLeft: {
          entityType: { value: 'Modules\\Iaccount\\Models\\Account' },
          entityId: { value: this.locatableModal.row.id },
        },
      };
    },
    customContactItems() {
      return {
        read: {
          requestParams: {
            filter: {
              entityType: 'Modules\\Iaccount\\Models\\Account',
              entityId: this.contactItemsModal.row.id,
            },
            include: 'translations',
          },
        },
        formLeft: {
          entityType: { value: 'Modules\\Iaccount\\Models\\Account' },
          entityId: { value: this.contactItemsModal.row.id },
        },
      };
    },
  },
};
</script>
