import { MyContext } from "src/types/Context";
import { Ctx, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bookmark } from "./Bookmark";
import { Comment } from "./Comment";
import { Posting } from "./Posting";
import { Reaction } from "./Reaction";
import { Topic } from "./Topic";
import { UserTopic } from "./UserTopic";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @Column({ type: "text" })
  pictureUrl: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bio: string;

  @Field(() => [Posting])
  @OneToMany(() => Posting, (post) => post.creator)
  postings: Promise<Posting[]>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (pr) => pr.creatorConnection)
  comments: Promise<Comment[]>;

  @Field(() => [Topic], { nullable: true })
  async subscriptions(@Ctx() ctx: MyContext): Promise<Topic[]> {
    return ctx.loaders.userTopics.load(this.id);
  }

  @Field(() => [Posting], { nullable: true })
  async bookmarks(@Ctx() ctx: MyContext): Promise<Posting[]> {
    return ctx.loaders.userPostings.load(this.id);
  }

  @OneToMany(() => UserTopic, (up) => up.user)
  @JoinTable({ name: "UserTopic" })
  postingUserTopicConnection: Promise<UserTopic[]>;

  @OneToMany(() => Bookmark, (up) => up.user)
  @JoinTable({ name: "PostingBookmark" })
  postingBookmarkConnection: Promise<Bookmark[]>;

  @OneToMany(() => Reaction, (r) => r.user)
  @JoinTable({ name: "PostingReaction" })
  postingReactionConnection: Promise<Reaction[]>;

  @OneToMany(() => Reaction, (r) => r.user)
  @JoinTable({ name: "CommentReaction" })
  commentReactionConnection: Promise<Reaction[]>;
}
