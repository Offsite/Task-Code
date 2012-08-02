Ext.define('TaskCodes.model.arealistModel', {
	extend: 'Ext.data.Model',
	alias: 'widget.arealistModel',
	
	config: 
	{
        identifier: 'uuid',
		fields: 
		[
			{name: 'code', type: 'int'},
			{name: 'areaDescription', type: 'string'},
		],
		validations: 
		[
			{type: 'length', field: 'code', min: 2, max: 2}
		]
	}
});