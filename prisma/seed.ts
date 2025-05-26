import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const emily = await prisma.user.upsert({
    where: { email: "emily.johnson@x.dummyjson.com" },
    update: {},
    create: {
      email: "emily.johnson@x.dummyjson.com",
      name: "Emily",
      posts: {
        create: {
          title: "His mother had always taught him",
          content:
            "His mother had always taught him not to ever think of himself as better than others. He d tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "history" }, create: { name: "history" } },
              { where: { name: "crime" }, create: { name: "crime" } },
            ],
          },
        },
      },
    },
  });
  const michael = await prisma.user.upsert({
    where: { email: "michael.williams@x.dummyjson.com" },
    update: {},
    create: {
      email: "michael.williams@x.dummyjson.com",
      name: "Michael",
      posts: {
        create: [
          {
            title: "He was an expert but not in a discipline",
            content:
              "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
            published: true,
            tags: {
              connectOrCreate: [
                { where: { name: "history" }, create: { name: "history" } },
                { where: { name: "crime" }, create: { name: "crime" } },
              ],
            },
          },
          {
            title: "Dave watched as the forest burned up on the hill.",
            content:
              "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldnt leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
            published: true,
            tags: {
              connectOrCreate: [
                { where: { name: "fiction" }, create: { name: "fiction" } },
                { where: { name: "english" }, create: { name: "english" } },
              ],
            },
          },
        ],
      },
    },
  });
  const sophia = await prisma.user.upsert({
    where: { email: "sophia.brown@x.dummyjson.com" },
    update: {},
    create: {
      email: "sophia.brown@x.dummyjson.com",
      name: "Sophia",
      posts: {
        create: {
          title: "All he wanted was a candy bar.",
          content:
            "All he wanted was a candy bar. It didnt seem like a difficult request to comprehend, but the clerk remained frozen and didnt seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "magical" }, create: { name: "magical" } },
              { where: { name: "history" }, create: { name: "history" } },
            ],
          },
        },
      },
    },
  });
  const james = await prisma.user.upsert({
    where: { email: "james.davis@x.dummyjson.com" },
    update: {},
    create: {
      email: "james.davis@x.dummyjson.com",
      name: "James",
      posts: {
        create: {
          title: "Hopes and dreams were dashed that day.",
          content:
            "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasnt and the hopes and dreams came crashing down.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "mystery" }, create: { name: "mystery" } },
              { where: { name: "english" }, create: { name: "english" } },
            ],
          },
        },
      },
    },
  });
  const emma = await prisma.user.upsert({
    where: { email: "emma.miller@x.dummyjson.com" },
    update: {},
    create: {
      email: "emma.miller@x.dummyjson.com",
      name: "Emma",
      posts: {
        create: {
          title: "Dave wasnt exactly sure how he had ended up",
          content:
            "Dave wasnt exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didnt make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "mystery" }, create: { name: "mystery" } },
              { where: { name: "crime" }, create: { name: "crime" } },
            ],
          },
        },
      },
    },
  });
  const olivia = await prisma.user.upsert({
    where: { email: "olivia.wilson@x.dummyjson.com" },
    update: {},
    create: {
      email: "olivia.wilson@x.dummyjson.com",
      name: "Olivia",
      posts: {
        create: {
          title: "This is important to remember.",
          content:
            "This is important to remember. Love isnt like pie. You dont need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesnt run out, so dont try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "english" }, create: { name: "english" } },
              { where: { name: "american" }, create: { name: "american" } },
            ],
          },
        },
      },
    },
  });
  const alexander = await prisma.user.upsert({
    where: { email: "alexander.jones@x.dummyjson.com" },
    update: {},
    create: {
      email: "alexander.jones@x.dummyjson.com",
      name: "Alexander",
      posts: {
        create: {
          title: "One can cook on and with an open fire.",
          content:
            "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, its best to slowly rotate it.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "magical" }, create: { name: "magical" } },
              { where: { name: "crime" }, create: { name: "crime" } },
            ],
          },
        },
      },
    },
  });
  const ava = await prisma.user.upsert({
    where: { email: "ava.taylor@x.dummyjson.com" },
    update: {},
    create: {
      email: "ava.taylor@x.dummyjson.com",
      name: "Ava",
      posts: {
        create: {
          title: "There are different types of secrets.",
          content:
            "There are different types of secrets. She had held onto plenty of them during her life, but this one was different. She found herself holding onto the worst type. It was the type of secret that could gnaw away at your insides if you didnt tell someone about it, but it could end up getting you killed if you did.",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "history" }, create: { name: "history" } },
              { where: { name: "american" }, create: { name: "american" } },
            ],
          },
        },
      },
    },
  });
  const ethan = await prisma.user.upsert({
    where: { email: "ethan.martinez@x.dummyjson.com" },
    update: {},
    create: {
      email: "ethan.martinez@x.dummyjson.com",
      name: "Ethan",
      posts: {
        create: {
          title: "They rushed out the door.",
          content:
            "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren",
          published: true,
          tags: {
            connectOrCreate: [
              { where: { name: "fiction" }, create: { name: "fiction" } },
              { where: { name: "magical" }, create: { name: "magical" } },
            ],
          },
        },
      },
    },
  });
  console.log({
    emily,
    michael,
    sophia,
    james,
    emma,
    olivia,
    alexander,
    ava,
    ethan,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
