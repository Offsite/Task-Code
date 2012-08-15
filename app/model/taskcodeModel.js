Ext.define('TaskCodes.model.taskcodeModel', {
	extend: 'Ext.data.Model',
	
	config: 
	{
        identifier: 'uuid',
		fields: 
		[
			{name: 'area', type: 'string'},
			{name: 'workType', type: 'string'},
			{name: 'craft', type: 'string'},
			{name: 'task', type: 'string'},
            {name: 'subtask', type: 'string'},
            {name: 'description', type: 'string'}
		],
		validations: 
		[
			{type: 'length', field: 'area', min: 2, max: 2},
			{type: 'length', field: 'workType', min: 2, max: 2},
			{type: 'length', field: 'craft', min: 2, max: 2},
			{type: 'length', field: 'task', min:2, max: 2},
            {type: 'length', field: 'subtask', min: 1, max: 1}
		]
	}
});