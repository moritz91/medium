import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Posting } from "./Posting";
import { Tag } from "./Tag";

@Entity()
export class PostingTag extends BaseEntity {
  @PrimaryColumn()
  tagId: string;

  @PrimaryColumn()
  postingId: string;

  @ManyToOne(() => Posting, p => p.tagConnection, { primary: true })
  @JoinColumn({ name: "postingId" })
  posting: Promise<Posting>;

  @ManyToOne(() => Tag, t => t.postingConnection, { primary: true })
  @JoinColumn({ name: "tagId" })
  tag: Promise<Tag>;
}
