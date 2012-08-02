Ext.define("TaskCodes.store.tasklistStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.tasklistModel',
		storeId: 'tasklistStore',
		autoLoad: true,
		autoSync: true
    }
});
