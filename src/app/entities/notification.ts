import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  cancelledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get category(): string {
    return this.props.category;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value;
  }

  public get cancelledAt(): Date | null | undefined {
    return this.props.cancelledAt;
  }

  public cancel(): void {
    this.props.cancelledAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unRead(): void {
    this.props.readAt = null;
  }
}
