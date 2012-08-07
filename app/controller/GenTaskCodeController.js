Ext.define("TaskCodes.controller.GenTaskCodeController", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            setAreaView: 'setareas',
            genTaskCodeView: 'gentaskcode',
            addTaskCodeView: 'addtaskcode'
        },
        control: {
            genTaskCodeView: {
                gentaskcodeBackCommand: 'onGenTaskCodeBackCommand',
                gentaskcodeSaveCommand: 'onGenTaskCodeSaveCommand',
                gentaskcodeAddCommand: 'onGenTaskCodeAddCommand'
            },
            addTaskCodeView: {
                addTaskCodeDoneCommand: 'onAddTaskCodeDoneCommand',
                addTaskCodeCommand: 'onAddTaskCodeCommand',
                addTaskCodeDeleteCodeCommand: 'onAddTaskCodeDeleteCodeCommand'
            }
        }
    },
    activateSetArea: function() {
        var setAreaView = this.getSetAreaView();
        Ext.Viewport.animateActiveItem(setAreaView, {
            type: 'slide',
            direction: 'right'
        });
    },
    activateAddTaskCode: function() {
        var addTaskCodeView = this.getAddTaskCodeView();
        Ext.Viewport.animateActiveItem(addTaskCodeView, {
            type: 'slide',
            direction: 'left'
        });
    },
    onAddTaskCodeDeleteCodeCommand: function() {
        console.log('onAddTaskCodeDeleteCodeCommand');
    },
    onAddTaskCodeDoneCommand: function() {
        console.log('onAddTaskCodeDoneCommand');
        var genTaskCodeView = this.getGenTaskCodeView();
        Ext.Viewport.animateActiveItem(genTaskCodeView, {
            type: 'slide',
            direction: 'right'
        });
    },
    onAddTaskCodeCommand: function() {
        console.log('onAddTaskCodeCommand');
        var addTaskCodeView = Ext.getCmp('addTaskCodeForm');
        var taskcodeLocalStore = Ext.getStore('taskcodeLocalStore');
        var newValues = addTaskCodeView.getValues();
        //        Ext.Msg.alert('Values', 'Area: ' + newValues.addTaskArea + '<br />Work Type: ' + newValues.addTaskType + '<br />Craft: ' + newValues.addTaskCraft + '<br />Task: ' + newValues.addtask + '<br />Subtask: ' + newValues.addsubtask, Ext.emptyFn);
        //Check if Task Description already exists, find open task/subtask
        var tasknum = 0;
        var subtasknum = 0;
        var matchTask = taskcodeLocalStore.findBy(function(record) {
            //requires editing
            for (this.tasknum = 0; this.tasknum < 100; this.tasknum++)
            {
                if (record.get('area') == newValues.addTaskArea && record.get('workType') == newValues.addTaskType && record.get('craft') == newValues.addTaskCraft && record.get('task') != this.tasknum) {
                    return true;
                }
            }
        });
        //this system does not handle the case of 1000 tasks
        var matchTask2 = taskcodeLocalStore.findBy(function(record) {
            //requires editing
            for (this.subtasknum = 0; this.subtasknum < 10; this.subtasknum++)
            {
                if (record.get('area') == newValues.addTaskArea && record.get('workType') == newValues.addTaskType && record.get('craft') == newValues.addTaskCraft && record.get('task') == newValues.addtask && record.get('subtask') != subtasknum) {
                    return true;
                }
            }
        });
        
        //spit out some console junk
        console.log(newValues.addTaskArea + ' ' + newValues.addTaskType + ' ' + newValues.addTaskCraft + ' ' + tasknum + ' ' + subtasknum);
        console.log(matchTask);
        console.log(matchTask2);
        console.log(tasknum);
        console.log(subtasknum);
        
        //set up for store
        var newrecord;
        newrecord = {
            area: newValues.addTaskArea,
            workType: newValues.addTaskType,
            craft: newValues.addTaskCraft,
            task: tasknum,
            subtask: subtasknum,
            descripton: "I really need to create a 'make description' routine"
        };
        console.log(newrecord.area, newrecord.workType, newrecord.craft);
                    
        //add value to store
        //taskcodeLocalStore.add(newrecord);
        //taskcodeLocalStore.sync();
        
        
        addTaskCodeView.setValues({
            addsubtask: ''
        });
    },
    onGenTaskCodeBackCommand: function() {
        console.log('onGenTaskCodeBackCommand');
        this.activateSetArea();
    },
    onGenTaskCodeSaveCommand: function() {
        console.log('onGenTaskCodeSaveCommand');
    },
    onGenTaskCodeAddCommand: function() {
        console.log('onGenTaskCodeAddCommand');
        this.activateAddTaskCode();
    },
    launch: function() {
        this.callParent(arguments);
        console.log('launch');
        var taskcodeLocalStore = Ext.getStore('taskcodeLocalStore');
        taskcodeLocalStore.load();
    },
    init: function() {
        this.callParent(arguments);
        console.log('initialize GenTaskCodeController');
    }
});