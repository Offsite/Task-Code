Ext.define("TaskCodes.store.projectStore", {
    extend: "Ext.data.Store",
    config:
    {
		model: 'TaskCodes.model.projectModel',
        proxy:
		{
			type: 'localstorage',
			id: 'new-project'
		}
    }
});