import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany } from "typeorm";
import { PostingTag } from "./PostingTag";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  name: string;

  @OneToMany(() => PostingTag, (tp) => tp.tag)
  @JoinTable({ name: "PostingTag" })
  postingConnection: Promise<PostingTag[]>;
}
