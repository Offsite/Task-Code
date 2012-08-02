Ext.define('TaskCodes.model.projectModel', {
	extend: 'Ext.data.Model',
	
	config: 
	{
        identifier: 'uuid',
		fields: 
		[
			{name: 'projectName', type: 'string'},
			{name: 'client', type: 'string'},
			{name: 'projectNumber', type: 'string'}
		]
	}
});