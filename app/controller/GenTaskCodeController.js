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
        for (tasknum = 0; tasknum < 100; tasknum++)
        {
            var matchTask = taskcodeLocalStore.findBy(this.FindRecordOne(), this);// FindRecordOne);
        }
        
        //this system does not handle the case of 1000 tasks
        /*var matchTask2 = taskcodeLocalStore.findBy(function(record) {
            //requires editing
            for (subtasknum = 0; subtasknum < 10; subtasknum++)
            {
                if (record.get('area') == newValues.addTaskArea && record.get('workType') == newValues.addTaskType && record.get('craft') == newValues.addTaskCraft && record.get('task') == tasknum && record.get('subtask') != subtasknum) {
                    subtasknum++;
                    return true;
                }
            }
        });*/
        
        //spit out some console junk
        console.log(newValues.addTaskArea + ' ' + newValues.addTaskType + ' ' + newValues.addTaskCraft + ' ' + tasknum + ' ' + subtasknum);
        console.log(this.matchTask);
        console.log(this.matchTask2);
        console.log(tasknum);
        console.log(subtasknum);
        var desc = "A description";
        //set up for store
        var newrecord;
        newrecord = {
            area: newValues.addTaskArea,
            workType: newValues.addTaskType,
            craft: newValues.addTaskCraft,
            task: tasknum,
            subtask: subtasknum,
            descripton: desc
        };
        console.log(newrecord.area, newrecord.workType, newrecord.craft, newrecord.task, newrecord.subtask);
                    
        //add value to store
        taskcodeLocalStore.add(newrecord);
        taskcodeLocalStore.sync();
        
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
    FindRecordOne: function(record) {
        //requires editing
        if (record.get('area') == this.newValues.addTaskArea && record.get('workType') == this.newValues.addTaskType && this.record.get('craft') == this.newValues.addTaskCraft && record.get('task') != this.tasknum) {
            return true;
        }
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
var FindRecordOne = function(record) {
    //requires editing
    if (record.get('area') == this.newValues.addTaskArea && record.get('workType') == this.newValues.addTaskType && this.record.get('craft') == this.newValues.addTaskCraft && record.get('task') != this.tasknum) {
        return true;
    }
};