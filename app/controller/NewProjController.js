Ext.define("TaskCodes.controller.NewProjController", {
	extend: "Ext.app.Controller",
	config:
	{
		refs:
		{
			newProjView: "newproj",
            newProjData: '#projData',
			setAreaView: 'setareas'
		},
		control:
		{
			newProjView:
			{
				cancelProjCommand: 'onCancelProjCommand',
				startNewProjCommand: 'onStartNewProjCommand'
			}
		}
	},
	activateSetArea: function()
	{
		var setAreaView = this.getSetAreaView();
		Ext.Viewport.animateActiveItem(setAreaView, {type: 'slide', direction: 'left'});
	},
	onStartNewProjCommand: function()
	{
		console.log('onStartNewProjCommand');
        var newProjView = this.getNewProjView();
        var newValues = newProjView.getValues();
        console.log('The new project is', newValues.projectName);
        console.log('The client is', newValues.client);
        console.log('The project number is', newValues.projectNumber);
//        Ext.Msg.alert('New Project', 'The new project is: ' + newValues.projectName + '<br />The client is: ' + newValues.client + '<br />The project number is: ' + newValues.projectNumber, Ext.emptyFn);
        var newproject = Ext.getStore('projectStore');
        newproject.add(newValues);
        newproject.sync();
		this.activateSetArea();
	},
	launch: function()
	{
		this.callParent(arguments);
		console.log('launch');
	},
	init: function()
	{
		this.callParent(arguments);
        window.localStorage.clear('all');
		console.log('initialize NewProjController');
	}
});