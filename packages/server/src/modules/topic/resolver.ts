import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Root,
  Mutation
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Topic } from "../../entity/Topic";
import { TopicRepository } from "../../repositories/TopicRepo";
import { MyContext } from "../../types/Context";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";
import { createResolver } from "../shared/create-resolver";
import { CreateTopicInput, FindTopicsInput } from "./Input";
import {
  DeleteTopicResponse,
  TopicResponse,
  FindTopicResponse
} from "./Response";
import { User } from "../../entity/User";
import { PostingRepository } from "../../repositories/PostRepo";

const suffix = "Topic";
// const TOPIC_LIMIT = 16;

export const createTopic = createResolver(
  suffix,
  CreateTopicInput,
  Topic,
  TopicResponse
);

export const loadCreatorForTopic = loadCreatorResolver(Topic);

@Resolver(Topic)
export class TopicResolver {
  @InjectRepository(TopicRepository)
  private readonly topicRepo: TopicRepository;
  @InjectRepository(PostingRepository)
  private readonly postingRepo: PostingRepository;

  @FieldResolver(() => User)
  creator(@Root() root: any, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(root.creatorId);
  }

  @FieldResolver()
  numPostings(@Root() root: Topic): Promise<number> {
    return this.postingRepo.count({ where: { topicId: root.id } });
  }

  @Query(() => FindTopicResponse)
  async findTopics(@Arg("input")
  {
    offset,
    limit
  }: FindTopicsInput): Promise<FindTopicResponse> {
    if (limit > 6) {
      throw new ApolloError("max limit of 6");
    }

    const topics = await getConnection()
      .getRepository(Topic)
      .createQueryBuilder("topic")
      .skip(offset)
      .take(limit + 1)
      .orderBy("name", "DESC")
      .getMany();

    return {
      hasMore: topics.length === limit + 1,
      topics: topics.slice(0, limit)
    };
  }

  @Mutation(() => TopicResponse, { name: `createTopicRepo` })
  @Authorized()
  async createTopic(
    @Arg("topic") input: CreateTopicInput,
    @Ctx() { req }: MyContext
  ): Promise<TopicResponse> {
    let value: Topic = await this.topicRepo.save({
      ...input,
      creatorId: req.session!.userId
    });

    return {
      topic: value
    };
  }

  @Query(() => Topic, {
    nullable: true
  })
  async getTopicById(@Arg("id") id: string) {
    return this.topicRepo.findOne(id);
  }

  @Mutation(() => DeleteTopicResponse, {
    nullable: true
  })
  @Authorized()
  async deleteTopicById(@Arg("id") id: string): Promise<DeleteTopicResponse> {
    const value = this.topicRepo.findOne(id);
    if (value) {
      this.topicRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }
}
