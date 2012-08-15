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
        //var matchTask = false;
        
        
        
        var matchTask = taskcodeLocalStore.findBy(function(record){
            if (record.get('area') != newValues.addTaskArea || record.get('workType') != newValues.addTaskType || record.get('craft') != newValues.addTaskCraft) {
                return false;
            }
            while(tasknum < 49)
            {
                while(subtasknum < 10)
                {
                    if (record.get('area') == newValues.addTaskArea && record.get('workType') == newValues.addTaskType && record.get('craft') == newValues.addTaskCraft && record.get('task') == tasknum && record.get('subtask') != subtasknum) {
                        return false;
                    }
                    subtasknum++;
                }
                subtasknum = 0;
                if (record.get('area') == newValues.addTaskArea && record.get('workType') == newValues.addTaskType && record.get('craft') == newValues.addTaskCraft && record.get('task') != tasknum) {
                    return false;
                }
                tasknum++;
            }
        });
            console.log(matchTask, " matchTask");
        
        if(tasknum < 10)
        {
            tasknum = "0" + tasknum;
        }
        
        //spit out some console junk
        console.log(newValues.addTaskArea + ' ' + newValues.addTaskType + ' ' + newValues.addTaskCraft + ' ' + tasknum + ' ' + subtasknum);
        //console.log(matchTask2);
        var desc = "A description";
        //set up for store
        var newrecord;
        newrecord = {
            area: newValues.addTaskArea,
            workType: newValues.addTaskType,
            craft: newValues.addTaskCraft,
            task: tasknum,
            subtask: subtasknum,
            description: desc
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