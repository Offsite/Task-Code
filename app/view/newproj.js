Ext.define('TaskCodes.view.newproj', {
	extend: 'Ext.form.Panel',
    requires: 'Ext.form.FieldSet',
	alias: 'widget.newproj',
	config: 
	{
        scrollable: 'vertical',
		items:
		[		
			{
                xtype: 'toolbar',
                docked: 'bottom',
                items: 
                [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: 'Start',
                        ui: 'confirm',
                        iconCls: 'action',
                        iconMask: true,
                        itemId: 'startProjButton'
                        }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '..::Task Codes::..'
            },
			{
				xtype: 'fieldset',
                title: 'Some Initial Information',
                instructions: 'Tell me a bit about your new project',
                id: 'projData',
                items: 
                [
                    {
                        xtype: 'textfield',
                        name: 'projectName',
                        placeHolder: 'Ex. ABC Tank Installation',
                        label: 'Project Name:'
                    },
                    {
                        xtype: 'textfield',
                        name: 'client',
                        placeHolder: 'Ex. XYZ Industries',
                        label: 'Client:'
                    },
                    {
                        xtype: 'textfield',
                        name: 'projectNumber',
                        placeHolder: 'Ex. KAM0YY-XXX',
                        label: 'Project Number:'
                    }
                ]
			}
		],
		listeners: 
		[
			{
				delegate: '#startProjButton',
				event: 'tap',
				fn: 'onStartProjButton'
			}
		]
	},
	onStartProjButton: function()
	{
        console.log('startNewProjCommand');
		this.fireEvent('startNewProjCommand', this);
	}
});