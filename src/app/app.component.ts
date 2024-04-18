import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FullscreenDirective,
  FullscreenTransition,
} from './fullscreen/fullscreen.directive';

export enum TriggerType {
  ELEMENT = 'ELEMENT',
  DOCUMENT = 'DOCUMENT',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild(FullscreenDirective, { static: true })
  fullscreen!: FullscreenDirective;

  TriggerType = TriggerType;
  trigger: TriggerType = TriggerType.ELEMENT;
  isFullscreen = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleFullscreen(trigger: TriggerType) {
    this.trigger = trigger;
    this.cdr.detectChanges();
    this.fullscreen.toggle();
  }

  onFullscreenChange(event: FullscreenTransition) {
    this.isFullscreen = event.isFullscreen;
  }
}
