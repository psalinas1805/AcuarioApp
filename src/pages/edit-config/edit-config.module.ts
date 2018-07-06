import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditConfigPage } from './edit-config';

@NgModule({
  declarations: [
    EditConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(EditConfigPage),
  ],
})
export class EditConfigPageModule {}
