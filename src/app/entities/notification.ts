import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
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

  public get readAt(): Date | null {
    return this.props.readAt;
  }

  public set readAt(value: Date | null) {
    this.props.readAt = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}