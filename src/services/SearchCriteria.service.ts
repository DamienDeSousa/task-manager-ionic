export class SearchCriteriaService
{
    private criteres: string[] = [
        'Titre',
        'Type',
        'Date'
    ];

    getCriterias()
    {
        return this.criteres;
    }
}