Ext.define('TaskCodes.view.workid', {
	extend: 'Ext.Panel',
	alias: 'widget.workid',
	requires: ['Ext.ux.touch.grid.View'],
	config: 
	{
		scrollable: true,
		items:
		[
			{
				xtype: 'toolbar',
				docked: 'bottom',
        		items: 
        		[
        			{
        				xtype: 'button',
        				text: 'Cancel',
        				ui: 'decline',
        				itemId: 'workidCancelButton'
        			},
        			{
        				xtype: 'spacer'
        			},
        			{
        				xtype: 'button',
        				text: 'Accept',
        				ui: 'confirm',
        				itemId: 'workidAcceptButton'
        			}
        		]
			},
			{
				xtype: 'panel',
				docked: 'top',
				height: 150,
				styleHtmlContent: true,
				items: 
				[
					{
						html: '<h3>Instructions...</h3>Use the [New Task] or [New Subtask] buttons to add an Tasks and Subtasks'
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						title: 'Work ID',
						items: 
						[
							{
								xtype: 'spacer'
							},
							{
								xtype: 'button',
								text: 'New Task',
								ui: 'action',
								itemId: 'workidNewTaskButton'
							},
							{
								items: 'button',
								text: 'New Subtask',
								ui: 'action',
								itemId: 'workidNewSubtaskButton'
							}
						]
					}
				]
			},
			{
				xtype: 'touchgridpanel',
	            columns:
	            [
	            	{
						header: 'Task',
						width: '10%'
	            	},
	            	{
	            		header: 'Sub Task',
	            		width: '10%'
	            	},
	            	{
						header: 'Description',
						width: '80%'
	            	}
	            ]
			}
		],
		listeners:
		[
			{
				delegate: '#workidCancelButton',
				event: 'tap',
				fn: 'onWorkidCancelButtonTap'
			},
			{
				delegate: '#workidAcceptButton',
				event: 'tap',
				fn: 'onWorkidAcceptButtonTap'
			},
			{
				delegate: '#workidNewTaskButton',
				event: 'tap',
				fn: 'onWorkidNewTaskButtonTap'
			},
			{
				delegate: '#workidNewSubtaskButton',
				event: 'tap',
				fn: 'onWorkidNewSubtaskButtonTap'
			}
		]
	},
	onWorkidCancelButtonTap: function()
	{
		console.log('workidCancelCommand');
		this.fireEvent('workidCancelCommand', this);
	},
	onWorkidAcceptButtonTap: function()
	{
		console.log('workidAcceptCommand');
		this.fireEvent('workidAcceptCommand', this);
	},
	onWorkidNewTaskButtonTap: function()
	{
		console.log('workidNewTaskCommand');
		this.fireEvent('workidNewTaskCommand', this);
	},
	onWorkidNewSubtaskButtonTap: function()
	{
		console.log('workidNewSubtaskCommand');
		this.fireEvent('workidNewSubtaskCommand', this);
	}
});