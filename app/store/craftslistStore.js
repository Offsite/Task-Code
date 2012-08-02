Ext.define("TaskCodes.store.craftslistStore", {
    extend: "Ext.data.Store",
    config: {
        model: 'TaskCodes.model.craftslistModel',
        storeId: 'craftslistStore',
        autoLoad: true,
        autoSync: true
    }
});