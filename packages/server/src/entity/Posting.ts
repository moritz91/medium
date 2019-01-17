import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Rate } from "./Rate";

@Entity()
@ObjectType({ description: "The posting model" })
export class Posting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ description: "The title of the posting" })
  @Column({ type: "text" })
  title: string;

  @Field({ description: "The body of the posting" })
  @Column({ type: "text" })
  body: string;

  @Field(() => [Rate])
  @Column({ type: "int", nullable: true })
  ratings: Rate[];

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  averageRating?: number;
}
