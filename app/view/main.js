Ext.define('TaskCodes.view.main', {
    extend: 'Ext.Panel',
    alias: 'widget.main',
  //  requires: ['TaskCodes.view.newproj', 'TaskCodes.view.setareas'],
    config:
    {
        fullscreen: true,
        layout: 'card',
        items: 
        [
        	{
        		xtype: 'titlebar',
        		docked: 'top',
        		title: '..::Task Codes::..'
        	},
        	{
				xtype: 'newproj',
        	}
        ]
    }
});