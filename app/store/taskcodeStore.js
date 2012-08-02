Ext.define("TaskCodes.store.taskcodeStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.taskcodeModel',
		storeId: 'taskcodeStore',
		autoLoad: true,
		autoSync: true
    }
});
