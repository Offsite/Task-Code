Ext.define('TaskCodes.model.craftslistModel', {
	extend: 'Ext.data.Model',
	
	config: 
	{
        id: 'uuid',
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
			url: 'app/data/craftslist.json'
		}
	}
});