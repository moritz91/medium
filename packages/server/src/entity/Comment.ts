import { Ctx, Field, ID, ObjectType, Root } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MyContext } from "../types/Context";
import { Posting } from "./Posting";
import { User } from "./User";

@Entity()
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => Posting, p => p.comments, { onDelete: "CASCADE" })
  posting: Promise<Posting>;

  @Field()
  @Column("uuid")
  postingId: string;
  @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creatorConnection: Promise<User>;

  @Field()
  @Column("uuid")
  creatorId: string;

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
}
