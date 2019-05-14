import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Posting } from "./Posting";
import { Tag } from "./Tag";

@Entity()
export class PostTag {
  @PrimaryColumn({ type: "int" })
  postingId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "postingId" })
  posting: Posting;

  @PrimaryColumn({ type: "int" })
  tagId: number;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: "tagId" })
  tag: Tag;
}
