Ext.define('TaskCodes.view.gentaskcode', {
	extend: 'Ext.Panel',
	alias: 'widget.gentaskcode',
	requires: ['Ext.ux.touch.grid.View'],
	config:
	{
		scrollable: true,
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
			{
				xtype: 'touchgridpanel',
				columns:
		        [
			       	{
						header: 'A',
						width: '5%'
			       	},
			       	{
				   		header: 'WT',
				   		width: '5%'
			       	},
			       	{
				   		header: 'C',
				   		width: '5%'
			       	},
			       	{
				   		header: 'T',
				   		width: '5%'
			       	},
			       	{
				   		header: 'ST',
				   		width: '5%'
			       	},
			       	{
						header: 'Description',
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