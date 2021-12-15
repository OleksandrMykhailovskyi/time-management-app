// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCYptPheL8WW8D2uR0fp5NVNpr6_1SP_GE",
    authDomain: "pomodoro-app-b5de6.firebaseapp.com",
    projectId: "pomodoro-app-b5de6",
    storageBucket: "pomodoro-app-b5de6.appspot.com",
    messagingSenderId: "244520755510",
    appId: "1:244520755510:web:ffcb5173cb6442b22c9397"
}

// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig);
export default firebaseDB;
const GET_TASKS = '/tasks';

//the method to render the tasks from FB. It is called in app.js, when /task-list/ is chosen in the URL-bar
export const fetchTasks = (cb) =>{
    firebaseDB.database().ref(GET_TASKS).on('value', function(snapshot){
        const taskArray = [];
        snapshot.forEach((childSnapshot)=>{
            taskArray.push({
                ...childSnapshot.val(),
                fbID: childSnapshot.key,
            })
        })
        cb(taskArray);
    })
}

export const fetchCurrentTask = (cb) =>{
    firebaseDB.database().ref(GET_TASKS).on('value', function(snapshot){
        const taskArray = [];
        snapshot.forEach((childSnapshot)=>{
            const childData = childSnapshot.val();
            if(childData.status==='Active'){
                taskArray.push({
                    ...childSnapshot.val(),
                    fbID: childSnapshot.key,
                });
            }
        })
        cb(taskArray);
    })
}