import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: [ './profile-img.component.scss' ]
})

export class ProfileImgComponent implements OnInit {
  @Input() src: string;

  ngOnInit() {
    if(this.src == null) throw new Error("Attribute 'src' is required");
  }

}
