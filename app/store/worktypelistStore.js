Ext.define("TaskCodes.store.worktypelistStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.worktypelistModel',
		storeId: 'worktypelistStore',
		autoLoad: true,
		//autoSync: true
    }
});