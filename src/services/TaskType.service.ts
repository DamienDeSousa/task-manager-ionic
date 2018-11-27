export class TaskTypeService
{
    private typeList: string[] = [
        'Rendez-vous',
        'Travail à faire',
        'Anniversaire',
        'Voyage',
        'Sport'
    ];

    public getTaskTypes()
    {
        return this.typeList;
    }
}