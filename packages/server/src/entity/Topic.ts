import { MyContext } from "src/types/Context";
import { Ctx, Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posting } from "./Posting";
import { PostingTopic } from "./PostingTopic";
import { UserTopic } from "./UserTopic";

@Entity()
@ObjectType()
export class Topic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  shortCaption: string;

  @Field({ nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  pictureUrl: string;

  @Field(() => [Posting], { nullable: true })
  async postings(@Ctx() { postingTopicLoader }: MyContext): Promise<Posting[]> {
    return postingTopicLoader.load(this.id);
  }

  @OneToMany(() => PostingTopic, (tp) => tp.topic)
  @JoinTable({ name: "PostingTopic" })
  postingConnection: Promise<PostingTopic[]>;

  @OneToMany(() => UserTopic, (ut) => ut.topic)
  @JoinTable({ name: "UserTopic" })
  userConnection: Promise<UserTopic[]>;
}
