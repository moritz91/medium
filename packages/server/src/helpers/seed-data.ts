import * as faker from "faker";
import { Comment } from "src/entity/Comment";
import { Posting } from "src/entity/Posting";
import { PostingTopic } from "src/entity/PostingTopic";
import { Tag } from "src/entity/Tag";
import { Topic } from "src/entity/Topic";
import { User } from "src/entity/User";
import { Column, ColumnOptions, DeepPartial, getRepository } from "typeorm";

export async function seedData() {
  const userRepository = getRepository(User);
  const postingRepository = getRepository(Posting);
  const commentRepository = getRepository(Comment);
  const tagRepository = getRepository(Tag);
  const topicRepository = getRepository(Topic);

  const defaultUser = userRepository.create({
    username: "moritz91",
    githubId: "4271921",
    pictureUrl: "https://avatars3.githubusercontent.com/u/4271921?v=4",
    bio: undefined,
  });

  await userRepository.save(defaultUser);

  let topics: DeepPartial<Topic>[] = generateEntities(
    {
      name: "{{company.bsNoun}}",
      pictureUrl: "{{image.image}}",
      shortCaption: "{{lorem.words}}",
    },
    1,
  );
  let postings: DeepPartial<Posting>[] = generateEntities(
    {
      previewTitle: "{{lorem.sentence}}",
      previewSubtitle: "{{lorem.sentences}}",
      previewImage: "{{image.image}}",
      title: "{{lorem.sentences}}",
      body: "{{lorem.paragraphs}}",
      allowResponses: true,
      creatorId: defaultUser.id,
    },
    40,
  );

  const topic = topicRepository.create(topics);
  const posting = postingRepository.create(postings);

  await Promise.all([
    topicRepository.save(topic),
    postingRepository.save(posting),
  ]).then((result: [Topic[], Posting[]]) => {
    result[1].forEach(async (posting: Posting) => {
      const comments: DeepPartial<Comment>[] = generateEntities(
        {
          creatorId: defaultUser.id,
          postingId: posting.id,
          text: faker.fake("{{lorem.paragraph}}"),
        },
        50,
      );
      let tags: DeepPartial<Tag>[] = generateEntities(
        {
          name: "{{lorem.word}}",
          postingId: posting.id,
        },
        20,
      );

      tagRepository.save(tagRepository.create(tags));
      commentRepository.save(commentRepository.create(comments));
    });

    result[0].forEach((topic: Topic) =>
      result[1].forEach((posting: Posting) => {
        PostingTopic.create({
          postingId: posting.id,
          topicId: topic.id,
        }).save();
      }),
    );
  });

  return { defaultUser };

  function generateEntities(entity: {}, entityAmount: number) {
    let entities: any[] = [];
    while (entityAmount) {
      entities = [...entities, entity];
      entityAmount -= 1;
    }

    entities.forEach((entity) => {
      Object.keys(entity).forEach((key: string) => {
        if (typeof entity[key] === "string")
          entity[key] = faker.fake(entity[key]);
      });
    });

    return entities;
  }
}

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}
