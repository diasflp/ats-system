import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  @Input() titleModal!: string;
  @Input() descriptionModal!: string;
  @Input() labelButtonDanger!: string;
  @Input() labelButtonPrimary!: string;
  @Output() deleteConfirmEvent = new EventEmitter();

  private idElement!: number;

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true,
  };

  confirm: PoModalAction = {
    action: () => {
      this.deleteConfirmEvent.emit();
    },
    label: 'Confirm',
  };

  constructor() {}

  ngOnInit() {}

  closeModal() {
    this.poModal.close();
  }

  deleteConfirm() {
    this.deleteConfirmEvent.emit(this.idElement);
  }

  open(idElement: number) {
    this.idElement = idElement;
    this.poModal.open();
  }
}
