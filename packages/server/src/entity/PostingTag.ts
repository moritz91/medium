import { Entity, PrimaryColumn, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { Posting } from "./Posting";
import { Tag } from "./Tag";

// Posting-Tag Many-to-Many Relationship (JoinTable)

@Entity()
export class PostingTag extends BaseEntity {
  @PrimaryColumn()
  tagId: string;

  @PrimaryColumn()
  postingId: string;

  @ManyToOne(() => Posting, (p) => p.tagConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "postingId" })
  posting: Promise<Posting>;

  @ManyToOne(() => Tag, (t) => t.postingConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tagId" })
  tag: Promise<Tag>;
}
