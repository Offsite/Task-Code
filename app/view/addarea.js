Ext.define('TaskCodes.view.addarea', {
	extend: 'Ext.form.Panel',
	alias: 'widget.addarea',
	config: 
	{
		layout: 'fit',
		modal: true,
		centered: true,
		width: 500,
		height: 120,
		scrollable: false,
		showAnimation: 
		{
			type: 'popIn',
			duration: 250,
			easing: 'easy-out'
		},
			hideAnimation: 
		{
			type: 'popOut',
			duration: 250,
			easing: 'ease-out'
		},
		items: 
		[
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Add An Area',
				items: 
				[
                    {
						xtype: 'button',
						ui: 'decline',
						text: 'Cancel',
						itemId: 'addareaCancelButton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'confirm',
						text: 'Done',
						itemId: 'addareaDoneButton'
					}
				]
			},
			{
				xtype: 'fieldset',
				items: 
				[
					{
						xtype: 'textfield',
						name: 'areaDescription',
                        placeHolder: 'Ex. Steam Tracing',
						label: 'Desription'
					}
				]
			}
		],
		listeners: 
		[
			{
				delegate: '#addareaDoneButton',
				event: 'tap',
				fn: 'onAddAreaDoneButtonTap'
			},
            {
                delegate: '#addareaCancelButton',
                event: 'tap',
                fn: 'onAddAreaCancelButtonTap'
            }
		]
	},
	onAddAreaDoneButtonTap: function()
	{
		console.log('addAreaDoneCommand');
		this.fireEvent('addAreaDoneCommand', this);
	},
    onAddAreaCancelButtonTap: function()
    {
        console.log('addAreaCancelCommand');
        this.fireEvent('addAreaCancelCommand');
    }
});