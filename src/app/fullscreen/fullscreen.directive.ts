import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';

export interface FullscreenTransition {
  isFullscreen: boolean;
  element: Element | null;
}

@Directive({
  selector: '[fullscreen]',
  exportAs: 'fullscreen',
})
export class FullscreenDirective {
  private element!: HTMLElement;

  @Input()
  set fullscreen(element: HTMLElement | string) {
    if (element instanceof ElementRef) {
      this.element = element.nativeElement;
    } else if (element instanceof HTMLElement) {
      this.element = element;
    } else if (element === '') {
      this.element = this.doc.documentElement;
    } else {
      throw new Error(
        `Only type HTMLElement or string allowed, got "${typeof element}".`
      );
    }
  }

  get fullscreen(): HTMLElement {
    return this.element;
  }

  @HostBinding('class.fullscreen')
  get isFullscreen(): boolean {
    return this.isFullscreenEnabled();
  }

  @HostListener('document:fullscreenchange')
  private onTransition() {
    const isFullscreen = this.isFullscreen;
    const element = this.element;
    this.change.emit({ isFullscreen, element });
  }

  @Output()
  change = new EventEmitter<FullscreenTransition>();

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  async enter() {
    if (this.fullscreen) {
      await this.enterElementFullscreen(this.fullscreen);
    } else {
      await this.enterDocumentFullscreen();
    }
  }

  async exit() {
    if (this.isFullscreen) {
      await this.exitFullscreen();
    }
  }

  toggle() {
    if (this.isFullscreen) {
      this.exit();
    } else {
      this.enter();
    }
  }

  private async enterDocumentFullscreen() {
    const elem = this.doc.documentElement;
    await this.enterFullscreen(elem);
  }

  private async exitDocumentFullscreen() {
    await this.exitFullscreen();
  }

  private async enterElementFullscreen(elem: HTMLElement) {
    await this.enterFullscreen(elem);
  }

  private async exitElementFullscreen() {
    await this.exitFullscreen();
  }

  private async enterFullscreen(elem: HTMLElement) {
    await ((elem as any).requestFullscreen?.() ||
      (elem as any).webkitRequestFullscreen?.() ||
      (elem as any).mozRequestFullScreen?.() ||
      (elem as any).msRequestFullscreen?.());
  }

  private async exitFullscreen() {
    await ((this.doc as any).exitFullscreen?.() ||
      (this.doc as any).webkitExitFullscreen?.() ||
      (this.doc as any).mozCancelFullScreen?.() ||
      (this.doc as any).msExitFullscreen?.());
  }

  private isFullscreenEnabled(): boolean {
    return !!(
      (this.doc as any).fullscreenElement ||
      (this.doc as any).webkitFullscreenElement ||
      (this.doc as any).mozFullScreenElement ||
      (this.doc as any).msFullscreenElement
    );
  }
}
