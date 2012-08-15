Ext.define("TaskCodes.store.taskcodeTmpStore", {
    extend: "Ext.data.Store",
    config:
    {
        model: 'TaskCodes.model.taskcodeModel',
		storeId: 'taskcodeTmpStore',
        proxy:
        {
            type: 'localstorage',
            id: 'task-code-tmp'
        }
    }
});