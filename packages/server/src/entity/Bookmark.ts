import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Posting } from "./Posting";
import { User } from "./User";

// 'Bookmarks' User-Posting Many-to-Many Relationship (JoinTable)

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  postingId: string;

  @ManyToOne(() => Posting, p => p.userConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "postingId" })
  posting: Promise<Posting>;

  @ManyToOne(() => User, u => u.postingConnection, {
    primary: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;
}
