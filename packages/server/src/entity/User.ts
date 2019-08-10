import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinTable,
  CreateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, Ctx } from "type-graphql";
import { Posting } from "./Posting";
import { Comment } from "./Comment";
import { Bookmark } from "./Bookmark";
import { MyContext } from "../types/Context";
import { Topic } from "./Topic";
import { Reaction } from "./Reaction";
import { UserTopic } from "./UserTopic";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  username?: string;

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
  @OneToMany(() => Posting, post => post.creator)
  postings: Promise<Posting[]>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, pr => pr.creatorConnection)
  comments: Promise<Comment[]>;

  @Field(() => [Topic], { nullable: true })
  async subscriptions(@Ctx() { userTopicLoader }: MyContext): Promise<Topic[]> {
    return userTopicLoader.load(this.id);
  }

  @Field(() => [Posting], { nullable: true })
  async bookmarks(@Ctx() { userPostingLoader }: MyContext): Promise<Posting[]> {
    return userPostingLoader.load(this.id);
  }

  @OneToMany(() => UserTopic, up => up.user)
  @JoinTable({ name: "UserTopic" })
  postingUserTopicConnection: Promise<UserTopic[]>;

  @OneToMany(() => Bookmark, up => up.user)
  @JoinTable({ name: "PostingBookmark" })
  postingBookmarkConnection: Promise<Bookmark[]>;

  @OneToMany(() => Reaction, r => r.user)
  @JoinTable({ name: "PostingReaction" })
  postingReactionConnection: Promise<Reaction[]>;

  @OneToMany(() => Reaction, r => r.user)
  @JoinTable({ name: "CommentReaction" })
  commentReactionConnection: Promise<Reaction[]>;
}
