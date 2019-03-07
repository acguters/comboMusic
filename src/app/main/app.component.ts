import { leftMenuItem, leftMenuSubItem } from './../model/menuItem';
import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { leftItems } from 'src/data/leftMenuDB';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = new FormControl('side');
  selectedItem:leftMenuItem;
  selectedSubItem:leftMenuSubItem;
  subSelected=false;

  ngOnInit() {
    this.selectedItem = leftItems[0];
    // console.log(this.selectedItem);
  }

  onItemSelected(item:leftMenuItem){
    this.selectedItem=item;
    this.subSelected=false;
    // console.log("SELEcted");
    console.log(this.selectedItem);
  }

  onSubItemSelected(subItem:leftMenuSubItem){
    this.selectedSubItem = subItem;
    this.subSelected=true;
    console.log(this.selectedItem);
  }
}
