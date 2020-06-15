import { MyContext } from "src/types/Context";
import { Ctx, Field, ID, Int, ObjectType, Root } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Posting } from "./Posting";
import { Reaction } from "./Reaction";
import { User } from "./User";

@Entity()
@ObjectType()
class Response {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => Int)
  numReactions: number;

  @Field(() => Boolean, { nullable: true })
  hasReacted: boolean;

  @Field(() => User)
  creator(@Ctx() ctx: MyContext): Promise<User> {
    return ctx.loaders.users.load(this.creatorId);
  }

  @Field(() => Boolean, { nullable: true })
  async isAuthor(@Root() root: Response, @Ctx() ctx: MyContext): Promise<Boolean> {
    return ctx.req.session!.userId === root.creatorId;
  }

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @ManyToOne(() => Posting, (p) => p.comments, { onDelete: "CASCADE" })
  posting: Promise<Posting>;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creatorConnection: Promise<User>;

  @OneToMany(() => Reaction, (r) => r.comment)
  userReactionConnection: Promise<Reaction[]>;
}

@Entity()
@ObjectType()
export class Comment extends Response {
  @Field()
  @Column("uuid")
  postingId: string;

  @Field(() => [Reply], { nullable: true })
  @OneToMany(() => Reply, (r) => r.comment)
  replies: Promise<Reply[]>;
}

@Entity()
@ObjectType()
export class Reply extends Response {
  @Field()
  @Column("uuid")
  commentId: string;

  @ManyToOne(() => Comment, (c) => c.replies, { onDelete: "CASCADE" })
  comment: Promise<Comment>;
}
