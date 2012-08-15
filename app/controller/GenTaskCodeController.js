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
        
        var areaDesc;
        var typeDesc;
        var craftDesc;
        var arealistStore = Ext.getStore('arealistStore');
        var craftslistStore = Ext.getStore('craftslistStore');
        var worktypelistStore = Ext.getStore('worktypelistStore');
        //create description
        var index = arealistStore.find('code', newValues.addTaskArea);
        areaDesc = arealistStore.getAt(index);
        index = craftslistStore.find('code', newValues.addTaskCraft);
        craftDesc = craftslistStore.getAt(index);
        index = worktypelistStore.find('code', newValues.addTaskType);
        typeDesc = worktypelistStore.getAt(index);
        var desc = areaDesc.get('areaDescription') + ' - ' + typeDesc.get('description') + ' - ' + craftDesc.get('description') + ' - ' + newValues.addtask;
        if (newValues.addsubtask != '')
        {
             desc = desc + ' - ' + newValues.addsubtask;
        }
        //spit out some console junk
        console.log(newValues.addTaskArea + ' ' + newValues.addTaskType + ' ' + newValues.addTaskCraft + ' ' + tasknum + ' ' + subtasknum);
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
        
        var taskcodeTmpStore = Ext.getStore('taskcodeTmpStore');
        //add value to store
        taskcodeTmpStore.add(newrecord);
        taskcodeTmpStore.sync();
        taskcodeLocalStore.add(newrecord);
        taskcodeLocalStore.sync();
        
        addTaskCodeView.setValues({
            addtask: '',
            addsubtask: ''
        });
    },
    onGenTaskCodeBackCommand: function() {
        console.log('onGenTaskCodeBackCommand');
        this.activateSetArea();
    },
    onGenTaskCodeSaveCommand: function() {
        console.log('onGenTaskCodeSaveCommand');
        Ext.Msg.alert('Not Implemented Yet');
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