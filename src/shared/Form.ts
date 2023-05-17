import { Form as XLitForm } from '@xlit/form';
import { ElementPart, noChange } from 'lit';
import { Directive, DirectiveResult, PartInfo, PartType, directive } from 'lit/directive.js';

interface FieldElement extends Element {
  value?: unknown;
  error?: string;
}

class FieldDirective extends Directive {
  private changeEventListener?: EventListener;

  constructor(partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('field directive must be used in element');
    }
  }

  update(part: ElementPart, [form, name]: [Form, string]): unknown {
    const el = part.element as FieldElement;

    if (!this.changeEventListener) {
      this.changeEventListener = form.handleInput(name);
      el.addEventListener('input', this.changeEventListener);
      el.addEventListener('change', this.changeEventListener);
    }

    el.value = form.model[name];
    el.error = form.errors[name];
    return noChange;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(...props: unknown[]): unknown {
    // never here override update
    return noChange;
  }
}

const fieldDirective = directive(FieldDirective);

export class Form<TModel = Record<string, unknown>> extends XLitForm<TModel> {
  field(name: string): DirectiveResult<typeof FieldDirective> {
    return fieldDirective(this, name);
  }
}
