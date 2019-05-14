import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany
} from "typeorm";
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

  @ManyToMany(() => Posting)
  @JoinTable({ name: "PostTag" })
  postings: Posting[];
}
