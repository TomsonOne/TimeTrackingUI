 export class formData {
     id:number;
     description:string;
     date:Date = new Date(new Date().setHours(0,0,0,0));
     hours:number;
     projectId:number = 0;
     projectName:string = "";
     workingPlace:string = "";
     isLoading:boolean = false;
     isEditing: boolean = false;
     isDirty: boolean = false;
}
export class weekData {
     week:number;
     formData:Array<formData>;
     weekTargetHours:number;
}
export class project {
     id: number;
     name:string;
     costumer:costumer
}
export class costumer {
     name:string;
}
export class month {
     id:number;
     text:string;
}


