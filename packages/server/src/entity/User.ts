import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Posting } from "./Posting";
import { Comment } from "./Comment";

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

  @OneToMany(() => Comment, pr => pr.creatorConnection)
  comments: Promise<Comment[]>;
}
