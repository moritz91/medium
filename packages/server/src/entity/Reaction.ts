import { Entity, JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Posting } from "./Posting";
import { User } from "./User";
import { Field } from "type-graphql";
import { Comment, Reply } from "./Comment";

// 'Reaction' User-Posting Many-to-Many Relationship (JoinTable)

@Entity()
export class Reaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  postingId: string;

  @Column({ nullable: true })
  commentId: string;

  @Column({ nullable: true })
  replyId: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  timestamp: Date;

  @ManyToOne(() => Posting, (p) => p.userReactionConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "postingId" })
  posting: Promise<Posting>;

  @ManyToOne(() => Comment, (c) => c.userReactionConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "commentId" })
  comment: Promise<Comment>;

  @ManyToOne(() => User, (u) => u.postingReactionConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @ManyToOne(() => User, (u) => u.commentReactionConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Reply, (r) => r.userReactionConnection, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "replyId" })
  reply: Promise<Reply>;
}
