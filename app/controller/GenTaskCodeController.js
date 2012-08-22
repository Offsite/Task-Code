Ext.define("TaskCodes.controller.GenTaskCodeController", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            setAreaView: 'setareas',
            genTaskCodeView: 'gentaskcode',
            addTaskCodeView: 'addtaskcode',
            outputView: 'output'
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
    activateOutput: function(outputTable) {
        var outputView = this.getOutputView();
        //outputView.setHtml(outputTable);
        Ext.Viewport.animateActiveItem(outputView, {
            type: 'slide',
            direction: 'left'
        });
        var outputPanel = Ext.getCmp('outputPanel');
        outputPanel.setHtml(outputTable);
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
            direction: 'down'
        });
    },
    onAddTaskCodeDeleteCodeCommand: function() {
        console.log('onAddTaskCodeDeleteCodeCommand');
    },
    onAddTaskCodeDoneCommand: function() {
        console.log('onAddTaskCodeDoneCommand');
        
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
        
        var genTaskCodeView = this.getGenTaskCodeView();        
        Ext.Viewport.animateActiveItem(genTaskCodeView, {
            type: 'slide',
            direction: 'up'
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
        var desc = areaDesc.get('areaDescription') + ' - ' + typeDesc.get('description') + ' - ' + craftDesc.get('description');
        if(newValues.addtask != '')
        {
            desc = desc + ' - ' + newValues.addtask;
        }
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
        //Ext.Msg.alert('Not Implemented Yet');
        
        var taskcodeLocalStore = Ext.getStore('taskcodeLocalStore');
        var taskCodeCount = taskcodeLocalStore.getCount('taskcodeLocalStore');
        var currentRecord;
        
        //var taskCodeTable = '<table border = 1>';
        var i = 0;
        /*
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
        */
        var taskCodeTable = 'The following data is in csv format which can be imported into excel.\n\nArea,Work Type,Craft,Task,Description\n';
        while (i < taskCodeCount) {
            console.log(taskCodeCount, " task code count");
            currentRecord = taskcodeLocalStore.getAt(i);
            
            taskCodeTable += currentRecord.get('area');
            taskCodeTable += ',';
            
            taskCodeTable += currentRecord.get('workType');
            taskCodeTable += ',';
            
            taskCodeTable += currentRecord.get('craft');
            taskCodeTable += ',';
             
            taskCodeTable += currentRecord.get('task');
            taskCodeTable += currentRecord.get('subtask');
            taskCodeTable += ',';
            
            taskCodeTable += currentRecord.get('description');
            taskCodeTable += '\n';
            
            i++;
        }

        //Ext.Viewport.add({xtype: 'output'});
        //this.activateOutput(taskCodeTable);
        var msg = {
            subject: 'Task Codes for Project ABC012-XXX',
            body: taskCodeTable
        };
        var first = 'kam';
        var sec = 'tech';
        var third = '-Task';
        var fourth = '-Code';
        var fifth = '@';
        var sixth = 'out';
        var seventh = 'loo';
        var eighth = 'k.com';
        var ress = first+sec+third+fourth+fifth+sixth+seventh+eighth;
        window.location = 'mailto:' + ress + '?' + Ext.urlEncode(msg);
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