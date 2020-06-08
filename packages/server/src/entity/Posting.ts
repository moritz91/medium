import { MyContext } from "src/types/Context";
import { Ctx, Field, Float, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookmark } from "./Bookmark";
import { Comment } from "./Comment";
import { PostingTag } from "./PostingTag";
import { PostingTopic } from "./PostingTopic";
import { Reaction } from "./Reaction";
import { Tag } from "./Tag";
import { Topic } from "./Topic";
import { User } from "./User";

@Entity()
@ObjectType()
export class Posting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (c) => c.posting)
  comments: Promise<Comment[]>;

  @Field(() => Int)
  numComments: number;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: "boolean", nullable: true })
  allowResponses: boolean;

  @Field(() => Int)
  numReactions: number;

  @Field(() => Float)
  readingTime: number;

  @ManyToOne(() => Topic, (p) => p.postings, { onDelete: "CASCADE" })
  topic: Promise<Topic>;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.postings)
  creator: Promise<User>;

  @Field(() => Boolean, { nullable: true })
  async isAuthor(@Ctx() ctx: MyContext): Promise<Boolean> {
    return ctx.req.session!.userId === this.creatorId;
  }

  @Field(() => Boolean, { nullable: true })
  isBookmark: boolean;

  @Field(() => Boolean, { nullable: true })
  hasReacted: boolean;

  @Field({ description: "The preview title of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewTitle: string;

  @Field({ description: "The preview subtitle of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewSubtitle: string;

  @Field({ description: "The preview image of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewImage: string;

  @Field({ description: "The title of the posting" })
  @Column({ type: "text" })
  title: string;

  @Field({ description: "The body of the posting" })
  @Column({ type: "text" })
  body: string;

  @Field(() => [Tag], { nullable: true })
  async tags(@Ctx() ctx: MyContext): Promise<Tag[]> {
    return ctx.loaders.tagPostings.load(this.id);
  }

  @Field(() => [Topic], { nullable: true })
  async topics(@Ctx() ctx: MyContext): Promise<Topic[]> {
    return ctx.loaders.topicPostings.load(this.id);
  }

  @OneToMany(() => PostingTag, (pt) => pt.posting)
  tagConnection: Promise<PostingTag[]>;

  @OneToMany(() => PostingTopic, (pt) => pt.posting)
  topicConnection: Promise<PostingTopic[]>;

  @OneToMany(() => Bookmark, (b) => b.posting)
  userBookmarkConnection: Promise<Bookmark[]>;

  @OneToMany(() => Reaction, (r) => r.posting)
  userReactionConnection: Promise<Reaction[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
