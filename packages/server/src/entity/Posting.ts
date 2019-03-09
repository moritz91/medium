import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Rate } from "./Rate";
import { User } from "./User";
import { Comment } from "./Comment";

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
  @OneToMany(() => Comment, qr => qr.posting)
  comments: Promise<Comment[]>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.postings)
  creator: Promise<User>;

  @Field({ description: "The title of the posting" })
  @Column({ type: "text" })
  title: string;

  @Field({ description: "The body of the posting" })
  @Column({ type: "text" })
  body: string;

  @Field(() => [Rate], { nullable: true })
  @Column({ type: "int", nullable: true })
  ratings: Rate[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
