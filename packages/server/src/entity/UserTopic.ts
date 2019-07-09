import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Topic } from "./Topic";
import { User } from "./User";

// 'Subscriptions' User-Topic Many-to-Many Relationship (JoinTable)

@Entity()
export class UserTopic extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  topicId: string;

  @ManyToOne(() => Topic, t => t.userConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "topicId" })
  topic: Promise<Topic>;

  @ManyToOne(() => User, u => u.postingConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;
}
