import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'valencia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  defaultNarrowLinks;
  constructor() {}

  ngOnInit(): void {}
}
