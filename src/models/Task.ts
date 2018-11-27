export class Task
{
    public fileURL: string;
    public location: {
        lat: number,
        lng: number
    };
    public pathFile: string;
    public fileName: string;
    //notifMe = 0 => false
    //notifMe = 1 => true
    public notifMe: number;

    constructor(public title: string,
                public type: string,
                public description: string,
                public day: string,
                public moment: string)
    {
        this.fileURL = '';
        this.location = {
            lat: 0.0,
            lng: 0.0
        };
        this.pathFile = '';
        this.fileName = '';
        this.notifMe = 0;
    }
}