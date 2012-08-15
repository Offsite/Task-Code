Ext.define('TaskCodes.view.gentaskcode', {
	extend: 'Ext.Panel',
	alias: 'widget.gentaskcode',
	requires: ['Ext.ux.touch.grid.View'],
	config:
	{
        layout: 'fit',
		items:
		[
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Task Codes',
				items: 
				[
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'add',
						iconMask: true,
						itemId: 'gentaskcodeAddButton',
					}
				]
			},
            /*{
                xtype: 'list',
                store: 'taskcodeLocalStore',
                itemTpl: '{area}-{workType}-{craft}-{task}{subtask}   {description}'
            },*/
			{
				xtype: 'touchgridpanel',
                title: 'Grid',
                store: 'taskcodeLocalStore',
				columns:
		        [
			       	{
						header: 'A',
                        dataIndex: 'area',
						width: '5%'
			       	},
			       	{
				   		header: 'WT',
                        dataIndex: 'workType',
				   		width: '5%'
			       	},
			       	{
				   		header: 'C',
                        dataIndex: 'craft',
				   		width: '5%'
			       	},
			       	{
				   		header: 'T',
                        dataIndex: 'task',
				   		width: '5%'
			       	},
			       	{
				   		header: 'ST',
                        dataIndex: 'subtask',
				   		width: '5%'
			       	},
			       	{
						header: 'Description',
                        dataIndex: 'description',
						width: '75%'
			       	}
				]
			},
			{
				xtype: 'toolbar',
				docked: 'bottom',
				items: 
				[
					{
						xtype: 'button',
						text: 'Back',
						ui: 'back',
						itemId: 'gentaskcodeBackButton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						text: 'Submit & Save',
						ui: 'confirm',
						iconCls: 'action',
						iconMask: true,
						itemId: 'gentaskcodeSaveButton'
					}
				]
			}
		],
		listeners:
		[
			{
				delegate: '#gentaskcodeBackButton',
				event: 'tap',
				fn: 'onGentaskcodeBackTap'
			},
			{
				delegate: '#gentaskcodeAddButton',
				event: 'tap',
				fn: 'onGentaskcodeAddTap'
			},
			{
				delegate: '#gentaskcodeSaveButton',
				event: 'tap',
				fn: 'onGentaskcodeSaveTap'
			}
		]
	},
	onGentaskcodeAddTap: function()
	{
		console.log('gentaskcodeAddCommand');
		this.fireEvent('gentaskcodeAddCommand', this);
	},
	onGentaskcodeBackTap: function()
	{
		console.log('gentaskcodeBackCommand');
		this.fireEvent('gentaskcodeBackCommand', this);
	},
	onGentaskcodeSaveTap: function()
	{
		console.log('gentaskcodeSaveCommand');
		this.fireEvent('gentaskcodeSaveCommand', this);
	}
});