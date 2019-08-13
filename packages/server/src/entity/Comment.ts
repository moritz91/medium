import { Ctx, Field, ID, ObjectType, Root, Int } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { MyContext } from "../types/Context";
import { Posting } from "./Posting";
import { User } from "./User";
import { Reaction } from "./Reaction";

@Entity()
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @Field()
  @Column("uuid")
  postingId: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => Int)
  numReactions: number;

  @Field(() => User)
  creator(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.creatorId);
  }

  @Field(() => Boolean, { nullable: true })
  async isAuthor(
    @Root() root: Comment,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    return ctx.req.session!.userId === root.creatorId;
  }

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @ManyToOne(() => Posting, p => p.comments, { onDelete: "CASCADE" })
  posting: Promise<Posting>;

  @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creatorConnection: Promise<User>;

  @OneToMany(() => Reaction, r => r.comment)
  userReactionConnection: Promise<Reaction[]>;
}
