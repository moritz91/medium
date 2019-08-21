import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Posting } from "./Posting";
import { Topic } from "./Topic";

// Posting-Topic Many-to-Many Relationship (JoinTable)
// Stories can belong to several topics and vice-versa!

@Entity()
export class PostingTopic extends BaseEntity {
  @PrimaryColumn()
  topicId: string;

  @PrimaryColumn()
  postingId: string;

  @ManyToOne(() => Posting, p => p.topicConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "postingId" })
  posting: Promise<Posting>;

  @ManyToOne(() => Topic, t => t.postingConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "topicId" })
  topic: Promise<Topic>;
}
