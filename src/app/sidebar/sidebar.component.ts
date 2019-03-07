import { leftMenuItem, leftMenuSubItem } from './../model/menuItem';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { leftItems } from 'src/data/leftMenuDB';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = new FormControl('side');
  leftItems = leftItems;
  leftSubItems;
  prevMainIndex = 0;

  @Output()
  leftItemSelected = new EventEmitter<leftMenuItem>();

  @Output()
  leftSubItemSelected = new EventEmitter<leftMenuSubItem>();

  constructor() { }

  ngOnInit() {
  }

  toggleSelected(index){
    if (!leftItems[index].isSelected){
      if(index!=this.prevMainIndex){
        leftItems[this.prevMainIndex].isSelected=false;
      }
      leftItems[index].isSelected = true;
      this.leftItemSelected.emit(leftItems[index]);
      this.leftSubItems = leftItems[index].subitems;
      this.prevMainIndex = index;
      // int i;
// tslint:disable-next-line: prefer-for-of
    } else {
      leftItems[index].isSelected = false;
    }
  }

  toggleSelectedSub(index){
    console.log(index);
      this.leftItemSelected.emit(this.leftSubItems[index]);
  }

}
