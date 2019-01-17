import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Rate extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("uuid")
  value: number;

  @Field()
  @Column({ type: "int" })
  date: Date;

  user: User;
}
