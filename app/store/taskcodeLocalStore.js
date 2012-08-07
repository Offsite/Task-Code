Ext.define("TaskCodes.store.taskcodeLocalStore", {
    extend: "Ext.data.Store",
    config:
    {
    	model: 'TaskCodes.model.taskcodeModel',
		storeId: 'taskcodeLocalStore',
        proxy:
        {
            type: 'localstorage',
            id: 'task-code-local'
        }
    }
});