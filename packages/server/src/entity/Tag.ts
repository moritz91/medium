import { ObjectType, Field, ID, Ctx } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany
} from "typeorm";
import { PostingTag } from "./PostingTag";
import { MyContext } from "../types/Context";
import { Posting } from "./Posting";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  name: string;

  @OneToMany(() => PostingTag, tp => tp.tag)
  @JoinTable({ name: "PostingTag" })
  postingConnection: Promise<PostingTag[]>;

  @Field(() => [Posting], { nullable: true })
  async postings(@Ctx() { postingsLoader }: MyContext): Promise<Posting[]> {
    return postingsLoader.load(this.id);
  }
}
