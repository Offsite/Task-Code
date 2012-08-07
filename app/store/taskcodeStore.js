Ext.define("TaskCodes.store.taskcodeStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.taskcodeModel',
		storeId: 'taskcodeStore',
		autoLoad: true,
        proxy:
        {
            type: 'ajax',
            url: 'app/data/taskcodes.json'
        }
    }
});