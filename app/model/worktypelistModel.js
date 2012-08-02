Ext.define('TaskCodes.model.worktypelistModel', {
	extend: 'Ext.data.Model',
	
	config: 
	{
		fields: 
		[
			{name: 'code', type: 'int'},
			{name: 'description', type: 'string'},
		],
		validations: 
		[
			{type: 'length', field: 'code', min: 2, max: 2},
		],
		proxy:
		{
			type: 'ajax',
			url: 'app/data/worktypelist.json'
		}
	}
});