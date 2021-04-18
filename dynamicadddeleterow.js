import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Dynamicadddeleterow extends LightningElement {

    @track listOfNewRows = [];
    totalItems = [];
    counter = 0;
    rowIndexToRemoveAfterSave;
    showSpinner = false;

    
    addNewRow(event){

        this.showSpinner = true;
        const rowItem = {};
        rowItem.rowId = ++this.counter;
        this.listOfNewRows.push(rowItem); 
        setTimeout(() => {
            this.showSpinner = false;
        }, 1000);     
    }

    cancelRow(event){

        this.rowIndexToRemoveAfterSave = event.target.name;
        this.cancelRowDynamic(this.rowIndexToRemoveAfterSave);
    }
    cancelRowDynamic(rowIndex){

        const rowIndx = rowIndex;
        var data = this.listOfNewRows;
        this.listOfNewRows = data.filter(function(element){
            return element.rowId !== rowIndx;
        });
    }
    handleSubmit(event){
        this.rowIndexToRemoveAfterSave = event.target.name;
    }
    handleSingleSave(event){
       
        this.dispatchEvent(
            new ShowToastEvent({
                'title' : 'Success', 'message':'Account Created Successfully.', 'variant':'success'
            }),
        );
        this.cancelRowDynamic(this.rowIndexToRemoveAfterSave);
    }
    handleError(event){

        this.dispatchEvent(
            new ShowToastEvent({
                'title' : 'Error', 'message':'Problem in creating account record:-.'+event.detail.error, 'variant':'error'
            }),
        );
    }
    
    get showAllSaveAndCancel(){
        return this.listOfNewRows.length > 1 ? true: false;
    }

    cancelAll(){
        this.listOfNewRows = [];
    }

    saveAll(){

       this.template.querySelectorAll('lightning-record-edit-form').forEach(form =>{
            form.submit();
       });
       this.dispatchEvent(
            new ShowToastEvent({
                'title' : 'Success', 'message':'Account Created Successfully.', 'variant':'success'
            }),
        );
        this.cancelAll();
    }   
}
