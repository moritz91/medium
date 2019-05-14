import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Rate extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "int" })
  date: Date;

  user: User;
}
