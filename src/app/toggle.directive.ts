import { Directive, ElementRef, HostListener, Renderer2, Input, Component, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef, Output } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-toggle-button',
  template: `
    <div *ngIf="hidden" class="input-group-append">Show</div>
    <div *ngIf="!hidden" class="input-group-append">Hide</div>
  `,
})
export class ToggleButtonComponent {
  hidden: boolean = true;

  @Output() clicked = new Subject<boolean>();

  @HostListener('click', ['$event'])
  onClick(e) {
    this.hidden = !this.hidden;
    this.clicked.next(this.hidden);
  }
}


@Directive({
  selector: '[passToggle]'
})
export class ToggleDirective {
  @Input() visible: boolean;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private factoryResolver: ComponentFactoryResolver,
    ) { }

  ngOnInit() {
    this.buildInputAppend();
  }

  buildInputAppend () {
    const factory = this.factoryResolver
                        .resolveComponentFactory(ToggleButtonComponent);

    const buttons = this.vcr.createComponent(factory);
    // in case we need to add classes... just an example...
    this.renderer.addClass(buttons.location.nativeElement, 'input-group-append');

    buttons.instance.clicked.subscribe(hidden => this.setVisibilty(hidden));
  }

  setVisibilty(hidden: boolean) {
    this.renderer.setAttribute(this.el.nativeElement, 'type', hidden ? 'password' : 'text');
  }
}