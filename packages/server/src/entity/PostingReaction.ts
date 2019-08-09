import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn
} from "typeorm";
import { Posting } from "./Posting";
import { User } from "./User";
import { Field } from "type-graphql";

// 'Reaction' User-Posting Many-to-Many Relationship (JoinTable)

@Entity()
export class PostingReaction extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  postingId: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  timestamp: Date;

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
