import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-docs-link',
    templateUrl: './docs-link.component.html',
    styleUrls: [ './docs-link.component.scss' ]
})
export class DocsLinkComponent
{
    @Input('link') link: string = 'https://hyperid.gitbook.io/hyperid-docs/introduction/what-is-hyperid';
}
