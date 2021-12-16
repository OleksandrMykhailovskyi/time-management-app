/* root component starts here */
import '../assets/less/main.less'; // include general styles
require('./router'); // include router

//pages components
require('./pages/popup');
require('./pages/task-list');
// require('./pages/first-page');

// functions import
import Router from './router.js';
import {HeaderListController} from './components/header/headerListController';
import {ReportsController} from './pages/reports/reportsController';
import {TimerController} from './pages/timer/timerController';
import {TaskListController} from './pages/task-list/taskListController';
import {SettingsController} from './pages/settings/settingsController';
import {fetchTasks} from './firebase';
import {fetchCurrentTask} from './firebase';
import { eventBus } from './eventBus';
import 'jquery-ui/ui/widgets/tooltip'

//gettings the elements from index.html
const root = document.getElementById('root1');
const header = document.getElementById('header1');

//creating the router
const router = new Router({
    mode: 'history'
});

//routes creation
router.add(/task-list/, () => {
    fetchTasks((data)=>{
        const dataHeader = {
            icons: [
                'icon-trash',
                'icon-list',
                'icon-statistics',
                'icon-settings'
            ]
        }
        new HeaderListController(header, dataHeader);
        new TaskListController(root, {tasks: data});
    });
});

router.add(/timer/, () => {
    fetchCurrentTask((data)=>{
        const dataHeader = {
            icons: [
                'icon-list',
                'icon-statistics',
                'icon-settings'
            ]
        }
        new HeaderListController(header, dataHeader);
        let timerController = new TimerController(root, {tasks: data});
        timerController.init();
        timerController.model.startTimer();
    })
})

router.add(/reports$/, () => {
    router.navigate('/reports/day/tasks');
    const dataHeader = {
        icons: [
            'icon-list',
            'icon-statistics',
            'icon-settings'
        ]
    }
    const dataReports = {
        days: [
            'Day',
            'Week',
            'Month'
        ],
        links: [
            'Pomodoros',
            'Tasks'
        ]
    }
    new HeaderListController(header, dataHeader);
    new ReportsController(root, dataReports);
})

router.add(/settings$/, () => {
    router.navigate('/settings/pomodoros')
    const dataHeader = {
        icons: [
            'icon-list',
            'icon-statistics',
            'icon-settings'
        ]
    }
    new HeaderListController(header, dataHeader);
    new SettingsController(root);
})

router.navigate('/task-list');

eventBus.subscribe('CHANGE_LOCATION', (str) =>{
    router.navigate(str);
})

//there is the plugin to make the line under the arrow icon
$(function(){
    $(document).tooltip({
        position: {
            my: "center top",
            at: "center bottom+10",
        }
    })
})