import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Int, Ctx } from "type-graphql";
import { Rate } from "./Rate";
import { User } from "./User";
import { Comment } from "./Comment";
import { Topic } from "./Topic";
import { PostingTag } from "./PostingTag";
import { MyContext } from "../types/Context";
import { Tag } from "./Tag";
import { PostingTopic } from "./PostingTopic";
import { UserPosting } from "./UserPosting";

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
  @OneToMany(() => Comment, p => p.posting)
  comments: Promise<Comment[]>;

  @Field(() => Int)
  numComments: number;

  @ManyToOne(() => Topic, p => p.postings, { onDelete: "CASCADE" })
  topic: Promise<Topic>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.postings)
  creator: Promise<User>;

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

  @Field(() => [Rate], { nullable: true })
  @Column({ type: "int", nullable: true })
  ratings: Rate[];

  @Field(() => [Tag], { nullable: true })
  async tags(@Ctx() { tagPostingLoader }: MyContext): Promise<Tag[]> {
    return tagPostingLoader.load(this.id);
  }

  @Field(() => [Topic], { nullable: true })
  async topics(@Ctx() { topicPostingLoader }: MyContext): Promise<Topic[]> {
    return topicPostingLoader.load(this.id);
  }

  @OneToMany(() => PostingTag, tp => tp.posting)
  tagConnection: Promise<PostingTag[]>;

  @OneToMany(() => PostingTopic, tp => tp.posting)
  topicConnection: Promise<PostingTopic[]>;

  @OneToMany(() => UserPosting, up => up.posting)
  userConnection: Promise<UserPosting[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
