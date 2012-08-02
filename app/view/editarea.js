Ext.define('TaskCodes.view.editarea', {
    extend: 'Ext.form.Panel',
	alias: 'widget.editarea',
	config: 
	{
  /*      showAnimation: 
		{
			type: 'slide',
            direction: 'left'
		},
			hideAnimation: 
		{
			type: 'slide',
            direction: 'right'
		},
*/		items: 
		[
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '..::Task Codes::..',
                items: 
                [
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        align: 'right',
                        text: 'Save',
                        iconCls: 'action',
                        iconMask: true,
                        itemId: 'editAreaSaveButton'
                    },
                    {
                        xtype: 'button',
                        ui: 'decline',
                        align: 'left',
                        text: 'Delete',
                        iconCls: 'trash',
                        iconMask: true,
                        itemId: 'editAreaCancelButton'
                    }
                ]
            },
            {
                xtype: 'fieldset',
				items: 
				[
					{
						xtype: 'textfield',
                        placeHolder: "This Shouldn't be here, there has been an error.",
						name: 'areaDescription',
						label: 'Desription'
					}
				]
            }
		],
        scrollable: 'false',
		listeners:
		[
			{
				delegate: '#editAreaSaveButton',
				event: 'tap',
				fn: 'onEditAreaSaveTap'
			},
			{
				delegate: '#editAreaCancelButton',
				event: 'tap',
				fn: 'onEditAreaCancelTap'
			}
		]
	},
	onEditAreaSaveTap: function()
	{
		console.log('editAreaSaveCommand');
		this.fireEvent('editAreaSaveCommand', this);
	},
	onEditAreaCancelTap: function()
	{
		console.log('editAreaCancelCommand');
		this.fireEvent('editAreaCancelCommand', this);
	}
});