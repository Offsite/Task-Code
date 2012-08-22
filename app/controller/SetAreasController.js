Ext.define("TaskCodes.controller.SetAreasController", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            setAreaView: 'setareas',
            editAreaView: 'editarea',
            newProjView: 'newproj',
            genTaskCodeView: 'gentaskcode',
            addAreaView: 'addarea',
        },
        control: {
            setAreaView: {
                areaListBackCommand: 'onAreaListBackCommand',
                areaListContinueCommand: 'onAreaListContinueCommand',
                addNewAreaCommand: 'onAddNewAreaCommand',
                editAreaCommand: 'onEditAreaCommand',
                removeAreaCommand: 'onRemoveAreaCommand'
            },
            addAreaView: {
                addAreaDoneCommand: 'onAddAreaDoneCommand',
                addAreaCancelCommand: 'onAddAreaCancelCommand'
            },
            editAreaView: {
                editAreaSaveCommand: 'onEditAreaSaveCommand',
                editAreaCancelCommand: 'onEditAreaCancelCommand'
            }
        }
    },
    activateNewProjView: function() {
        var newProjView = this.getNewProjView();
        Ext.Viewport.animateActiveItem(newProjView, {
            type: 'slide',
            direction: 'right'
        });
    },
    activateSetAreaView: function() {
        var setAreaView = this.getSetAreaView();
        Ext.Viewport.animateActiveItem(setAreaView, {
            type: 'slide',
            direction: 'right'
        });
    },
    activateGenTaskCodeView: function() {
        var genTaskCodeView = this.getGenTaskCodeView();
        
        var taskcodeLocalStore = Ext.getStore('taskcodeLocalStore');
        var taskCodeCount = taskcodeLocalStore.getCount('taskcodeLocalStore');
        var currentRecord;
        var taskCodeTable = '<table border = 1>';
        var i = 0;
        while (i < taskCodeCount) {
            console.log(taskCodeCount, " task code count");
            currentRecord = taskcodeLocalStore.getAt(i);
            
            taskCodeTable += '<tr><td>';
            taskCodeTable += currentRecord.get('area');
            taskCodeTable += '</td>';
            
            taskCodeTable += '<td>';
            taskCodeTable += currentRecord.get('workType');
            taskCodeTable += '</td>';
            
            taskCodeTable += '<td>';
            taskCodeTable += currentRecord.get('craft');
            taskCodeTable += '</td>';
            
            taskCodeTable += '<td>'; 
            taskCodeTable += currentRecord.get('task');
            taskCodeTable += currentRecord.get('subtask');
            taskCodeTable += '</td>';
            
            taskCodeTable += '<td>';
            taskCodeTable += currentRecord.get('description');
            taskCodeTable += '</td></tr>';
            
            i++;
        }
        taskCodeTable += '</table>';
        var TaskTable = Ext.getCmp('TaskTable');
        TaskTable.setHtml(taskCodeTable);
        
        Ext.Viewport.animateActiveItem(genTaskCodeView, {
            type: 'slide',
            direction: 'left'
        });
    },
    activateEditAreaView: function(record) {
        var editAreaView = this.getEditAreaView();
        editAreaView.setRecord(record);
        Ext.Viewport.animateActiveItem(editAreaView, {
            type: 'slide',
            direction: 'left'
        });
    },
    onEditAreaCommand: function(list, record) {
        console.log('onEditAreaCommand');
        this.activateEditAreaView(record);
    },
    onEditAreaSaveCommand: function() {
        console.log('onEditAreaSaveCommand');
        var editAreaView = this.getEditAreaView();
        var newValues = editAreaView.getValues();
        console.log('The new description is ' + newValues.areaDescription);
        //Ext.Msg.confirm('Are You Sure?', 'Are you sure you want to change the area description to ' + newValues.areaDescription, Ext.emptyFn);
        
        var currentRecord = editAreaView.getRecord();
        
        currentRecord.set("areaDescription", newValues.areaDescription);
        var areas = Ext.getStore('arealistStore');
        areas.sync();
        
        this.activateSetAreaView();
    },
    onEditAreaCancelCommand: function() {
        console.log('onEditAreaCancelCommand');
        
        var editAreaView = this.getEditAreaView();
        var currentNote = editAreaView.getRecord();
        var areaStore = Ext.getStore("arealistStore");
        areaStore.remove(currentNote);
        areaStore.sync();
        
        this.activateSetAreaView();
    },
    onAreaListBackCommand: function() {
        console.log('onAreaListBackCommand');
        if (this.addAreaView) {
            this.addAreaView.destroy();
        }
        this.activateNewProjView();
    },
    onAreaListContinueCommand: function() {
        console.log('onAreaListContinueCommand');
        if (this.addAreaView) {
            this.addAreaView.destroy();
        }
        this.activateGenTaskCodeView();
    },
    onAddNewAreaCommand: function() {
        console.log('onAddNewAreaCommand');
        if (this.addAreaView) {
            this.addAreaView.destroy();
        }
        this.addAreaView = Ext.Viewport.add({
            xtype: 'addarea'
        });
        this.addAreaView.show();
    },
    onAddAreaDoneCommand: function() {
        console.log('onAddAreaDoneCommand');
        var addAreaView = this.getAddAreaView();
        var newValues = addAreaView.getValues();
        this.areacounter = this.areacounter + 5;
        newValues.code = this.areacounter;
        console.log('The new area is ' + newValues.areaDescription);
//        Ext.Msg.alert('New Area', 'The new area is: ' + newValues.areaDescription);
        var newarea = Ext.getStore('arealistStore');
        newarea.add(newValues);
        newarea.sync();
        this.addAreaView.hide();
    },
    onRemoveAreaCommand: function() {
        console.log('onRemoveAreaCommand');
        var setAreaView = this.getSetAreaView();
        var currentRecord = this.selectedRecord;
        var areas = Ext.getStore('arealistStore');
        areas.remove(currentRecord);
        areas.sync();
    },
    onAddAreaCancelCommand: function() {
        console.log('onAddAreaCancelCommand');
        this.addAreaView.hide();
    },
    launch: function() {
        this.callParent(arguments);
        console.log('launch');
    },
    init: function() {
        this.callParent(arguments);
        this.areacounter = 5;
        var arealiststore = Ext.getStore('arealistStore');
        arealiststore.load();
        console.log('initialize SetAreasController');
    },
});