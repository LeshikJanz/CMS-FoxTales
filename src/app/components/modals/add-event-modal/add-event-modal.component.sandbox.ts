import { sandboxOf } from 'angular-playground';
import { AddEventModalComponent } from "./add-event-modal.component";
import { ModalModule } from "ngx-bootstrap";

export default sandboxOf(AddEventModalComponent, {
  imports: [ModalModule.forRoot()]
})
  .add('add event modal', {
    template: `<button type="button" (click)="lgModal.show();">Add</button>
  <add-event-modal #lgModal [groupName]="'Halloween'"></add-event-modal>`
  })
