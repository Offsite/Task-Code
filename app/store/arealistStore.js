Ext.define("TaskCodes.store.arealistStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.arealistModel',
		storeId: 'arealistStore',
//		autoLoad: true,
//		autoSync: true,
        proxy:
		{
			type: 'localstorage',
			id: 'areas'
		}
    }
});