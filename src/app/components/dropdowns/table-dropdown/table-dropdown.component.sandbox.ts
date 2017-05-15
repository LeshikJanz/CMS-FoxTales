import { sandboxOf } from 'angular-playground';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TableDropDownComponent } from "./table-dropdown.component";
import { ITableAction } from "../../../shared/table/action.interface";

export default sandboxOf(TableDropDownComponent, { imports: [ BsDropdownModule.forRoot() ] })
  .add('small', {
    template: `
              <div >
               <table-dropdown 
               [title]="title"
               [options]="options"
               [size]="size"
               (typeChanged)="onTypeChanged($event)"
               ></table-dropdown></div>`,
    context: {
      title: "Most recent",
      options: [
        { title: 'Edit',      callback: 'editClient' },
        { title: 'Archive',   callback: 'archiveClient' },
        { title: 'Unarchive', callback: 'unarchiveClient' }
      ],
      size: 'small',
      onTypeChanged(event) {
        console.log("onTypeChanged");
        console.log(event);
      }
    }
  })

  .add('medium', {
    template: `<div style="margin-left: 100px">
                <table-dropdown 
               [title]="title"
               [options]="options"
               [size]="'medium'"
               (typeChanged)="onTypeChanged($event)"
               ></table-dropdown></div>`,
    context: {
      title: "Action",
      options: [
        { title: 'Edit',      callback: 'editClient' },
        { title: 'Archive',   callback: 'archiveClient' },
        { title: 'Unarchive', callback: 'unarchiveClient' }
      ],
      size: 'small',
      onTypeChanged(event) {
        console.log("onTypeChanged");
        console.log(event);
      }
    }
  })

  .add('big', {
    template: `<div style="margin-left: 100px">
                <table-dropdown
               [title]="title"
               [options]="options"
               [size]="'big'"
               (typeChanged)="onTypeChanged($event)"
               ></table-dropdown></div>`,
    context: {
      title: "Action",
      options: [
        { title: 'Edit',      callback: 'editClient' },
        { title: 'Archive',   callback: 'archiveClient' },
        { title: 'Unarchive', callback: 'unarchiveClient' }
      ],
      size: 'small',
      onTypeChanged(event) {
        console.log("onTypeChanged");
        console.log(event);
      }
    }
  });

