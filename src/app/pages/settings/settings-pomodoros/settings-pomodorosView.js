import tmp from "./settings-pomodoros.handlebars"

export class SettingsPomodorosView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model)
    }
}