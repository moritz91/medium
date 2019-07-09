import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ObjectType, Field, ID, Ctx } from "type-graphql";
import { Posting } from "./Posting";
import { Comment } from "./Comment";
import { Topic } from "./Topic";
import { UserPosting } from "./UserPosting";
import { MyContext } from "src/types/Context";

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

  @Field(() => [Posting], { nullable: true })
  async bookmarks(@Ctx() { userPostingLoader }: MyContext): Promise<Posting[]> {
    return userPostingLoader.load(this.id);
  }

  @Field(() => [Topic])
  @ManyToMany(() => Topic, topic => topic.subscribers)
  subscriptions: Promise<Topic[]>;

  @OneToMany(() => UserPosting, up => up.user)
  @JoinTable({ name: "PostingBookmark" })
  postingConnection: Promise<UserPosting[]>;
}
