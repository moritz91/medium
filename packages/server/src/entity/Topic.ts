import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany
} from "typeorm";
import { User } from "./User";
import { Posting } from "./Posting";

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
  @Column({ type: "text", unique: true, nullable: true })
  pictureUrl: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description: string;

  @Field(() => Int)
  numPostings: number;

  @Field(() => [Posting])
  @OneToMany(() => Posting, qr => qr.topic)
  postings: Promise<Posting[]>;

  @Field(() => [User])
  @ManyToMany(() => User, sbr => sbr.subscriptions)
  subscribers: Promise<User[]>;
}
