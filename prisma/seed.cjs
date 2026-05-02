const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_borneotan',
  });

  await conn.execute(
    'INSERT INTO User (email, password, role, createdAt) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE email=email',
    ['admin@borneotan.org', hash, 'admin']
  );

  const stats = [
    ['Orangutans Remaining', '~104,700'],
    ['Forest Lost (ha/yr)', '1.3M+'],
    ['IUCN Status', 'Critical'],
    ['Population Drop (60yr)', '>50%'],
  ];
  for (const [label, value] of stats) {
    await conn.execute(
      'INSERT INTO Statistic (label, value, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE label=label',
      [label, value]
    );
  }

  const posts = [
    {
      title: 'Why Bornean Orangutans Are Critically Endangered',
      slug: 'why-bornean-orangutans-are-critically-endangered',
      image: 'https://images.unsplash.com/photo-1571386195942-dfb9db1e17d9?auto=format&fit=crop&w=1200&q=80',
      content: `Bornean orangutans (Pongo pygmaeus) are classified as Critically Endangered on the IUCN Red List — the highest threat category before extinction in the wild. Their population has declined by more than 50% over the past 60 years, and that decline is accelerating.

## The Main Drivers

### 1. Deforestation
Borneo has lost over half its ancient rainforest in less than a century. The primary cause is the expansion of palm oil plantations, which replaced millions of hectares of biodiverse forest with a monoculture that supports almost no wildlife. Logging — both legal and illegal — compounds the destruction, opening up previously inaccessible forest to further clearing.

Orangutans are completely dependent on large, intact forest. They need vast home ranges and rely on hundreds of tree species for food. When that forest disappears, they have nowhere to go.

### 2. Habitat Fragmentation
Even when forests are not fully cleared, roads and agriculture slice them into isolated patches. Orangutans cannot easily cross open ground — they are vulnerable to predation, starvation, and human conflict when forced to do so. Fragmentation also cuts off gene flow between populations, weakening genetic diversity over generations.

### 3. Illegal Wildlife Trade
Despite being protected under Indonesian law, orangutans are still captured for the exotic pet trade. The main targets are infants, which means their mothers — who are fiercely protective — must first be killed. Most infant orangutans taken as pets die within months from stress, improper diet, and disease.

## Why It Matters

Orangutans are often called the "gardeners of the rainforest." They swallow seeds whole and deposit them across vast areas, making them critical for forest regeneration. Without them, the biodiversity of Borneo's rainforest would collapse over time.

They also share approximately 97% of their DNA with humans. Losing them would be an irreversible tragedy — not just ecologically, but morally.

## What Can Be Done

Conservation efforts that work include habitat protection and corridor restoration, community-based land use agreements that provide alternatives to forest clearing, rehabilitation centres for rescued orangutans, and consumer campaigns targeting deforestation-linked supply chains — especially palm oil.

Support from the international community, both in funding and consumer choices, is critical to turning this around.`,
    },
    {
      title: 'A Day in the Life of a Wild Orangutan',
      slug: 'a-day-in-the-life-of-a-wild-orangutan',
      image: 'https://images.unsplash.com/photo-1727100828954-8759b3e98d21?auto=format&fit=crop&w=1200&q=80',
      content: `What does a day actually look like for a wild Bornean orangutan? Far from the image of a lumbering, slow animal, orangutans live rich, complex lives — full of problem-solving, social navigation, and extraordinary physical skill.

## Dawn: The Long Call

Just before sunrise, if there is a flanged adult male in the area, the forest fills with one of its most haunting sounds: the long call. A deep, resonating roar that can carry up to one kilometre through dense jungle, it serves as both a territorial announcement and a signal to receptive females. Males spend years developing this call, and younger males learn from listening to their elders.

## Morning: Foraging

Orangutans spend the majority of their waking hours — roughly six to eight hours per day — searching for and eating food. They are primarily frugivores, meaning fruit makes up about 60% of their diet. But they are highly opportunistic: bark, leaves, flowers, insects, bird eggs, and occasionally small vertebrates round out their nutrition.

What makes them remarkable foragers is their memory. Studies have shown orangutans maintain detailed mental maps of which trees fruit at which times of year, sometimes travelling several kilometres directly to a tree that will peak that week — demonstrating a form of episodic memory previously thought unique to humans.

## Midday: Rest and Play

The hottest part of the day is typically spent resting in the canopy, often in a hastily constructed day nest — a loose platform of bent branches. Young orangutans use this time to play, practise tool use, and test their climbing skills.

Juveniles who are still with their mothers (which can last up to eight years) observe adults closely during foraging. This social learning is how they acquire the regional "culture" of their group — which foods to eat, how to open tough-husked fruit, which plants have medicinal value.

## Afternoon: More Foraging

As temperatures drop, foraging resumes. Adult orangutans can travel up to one kilometre through the canopy in a single afternoon, using their powerful arms to bridge gaps between trees. Their arm span — up to 2.2 metres — and rotating shoulder joints give them a freedom of movement in the trees that no other great ape matches.

## Dusk: Nest Building

Every single night, orangutans build a new sleeping nest. Unlike gorillas, who often reuse nests, orangutans construct fresh ones — typically 10 to 30 metres above the ground. The process takes about five minutes: selecting a sturdy fork in a tree, bending and weaving branches into a platform, then adding a mattress of softer leaf material. Young orangutans begin practising nest building from about two years old, but competent nests take years to master.

This nightly routine is one of the behaviours that most closely mirrors human-like planning and tool use — selecting a site, gathering materials, constructing shelter.

## What This Tells Us

The daily life of a wild orangutan is a window into what intelligence looks like when it evolves in a forest rather than on a savannah. Their cognitive abilities — spatial memory, tool use, cultural learning, forward planning — rival those of chimpanzees and in some domains approach human levels.

Protecting these animals is not just an ecological imperative. It is a chance to preserve one of the most remarkable minds on the planet.`,
    },
    {
      title: 'Palm Oil: What Your Shopping Choices Have to Do With Orangutan Extinction',
      slug: 'palm-oil-shopping-choices-orangutan-extinction',
      image: 'https://images.unsplash.com/photo-1645430785800-d7d0daac9c5c?auto=format&fit=crop&w=1200&q=80',
      content: `You probably ate palm oil today. It is in roughly half of all packaged products sold in supermarkets — bread, chocolate, shampoo, lipstick, instant noodles, margarine, biscuits. And there is a direct line between your shopping trolley and the destruction of Borneo's rainforest.

## What Is Palm Oil?

Palm oil is extracted from the fruit of the oil palm tree (Elaeis guineensis), native to West Africa but now grown at industrial scale across Southeast Asia — primarily Indonesia and Malaysia, which together supply about 85% of the world's palm oil.

It is the world's most widely used vegetable oil because it is extraordinarily productive: oil palms yield more oil per hectare than any other plant-based oil source. It is also cheap, has a long shelf life, and is semi-solid at room temperature — making it ideal for processed food manufacturing.

## The Problem

The demand for palm oil has driven one of the fastest rates of deforestation on Earth. In Borneo and Sumatra, vast tracts of peat swamp forest — some of the most carbon-dense and biodiverse ecosystems on the planet — have been drained and burned to make way for plantations.

Between 1999 and 2015, Borneo lost about a third of its forest cover. Much of that loss was directly driven by palm oil expansion. The orangutan's range and the palm oil frontier overlap almost perfectly.

When forests are cleared, orangutans are killed, displaced, or captured. Those that survive in adjacent forest often raid plantations for food and are shot as pests.

## Is "Sustainable" Palm Oil Real?

The Roundtable on Sustainable Palm Oil (RSPO) certifies palm oil produced without clearing new forest or draining peatlands. RSPO-certified oil exists and is growing in market share, but it still accounts for a minority of global supply — and enforcement is inconsistent.

Critics argue that RSPO certification has too often allowed companies to brand business-as-usual as sustainable. Independent audits are infrequent, and smallholder farmers — who produce roughly 40% of palm oil — are largely outside certification schemes.

That said, completely boycotting palm oil is not the answer. Replacing it with other oils (sunflower, rapeseed, soy) would require significantly more land to produce the same volume, potentially causing even more deforestation elsewhere. The goal should be better palm oil, not no palm oil.

## What You Can Do

**Check labels.** In the EU and UK, palm oil must be listed by name. Look for it in ingredients lists and choose RSPO-certified products where possible.

**Support brands that are transparent.** Some companies publish their full palm oil supply chains. Others hide it under 200+ derivative names. The Rainforest Action Network publishes scorecards.

**Pressure matters.** Consumer campaigns have moved major companies. Unilever, Nestlé, and others have made (imperfect, contested) commitments to deforestation-free palm oil largely because of sustained public pressure.

**Donate to on-the-ground work.** Policy change and habitat restoration in Indonesia is ultimately what saves orangutans. Organisations like BorneoTan fund that work directly.

The connection between a biscuit on a supermarket shelf and an orangutan in a burning forest is real. So is your ability to push that connection in a better direction.`,
    },
    {
      title: 'Inside an Orangutan Rehabilitation Centre',
      slug: 'inside-an-orangutan-rehabilitation-centre',
      image: 'https://images.unsplash.com/photo-1685108305105-d76aa2aa38f7?auto=format&fit=crop&w=1200&q=80',
      content: `Every year, dozens of orphaned and injured orangutans arrive at rehabilitation centres across Kalimantan and Sumatra — confiscated from the illegal pet trade, rescued from burning plantations, or found alone after their mothers were killed. The work of getting them back to the wild is long, painstaking, and not always successful. But it is essential.

## How Orangutans End Up in Rehabilitation

Most infants arrive severely traumatised. They have typically witnessed their mother's death, been transported in cramped, filthy conditions, and kept as pets — often chained, malnourished, and denied the physical contact that is critical for infant orangutan development. Some are so psychologically damaged that they never fully recover.

Adult orangutans enter rehabilitation after habitat loss forces them into plantations, where they are shot and wounded, or after being electrocuted on power lines. The injuries are often severe.

## The Rehabilitation Process

Rehabilitation is structured in stages, typically spanning several years.

**Infant school** is where young orangutans — especially those who arrived too young to have learned forest skills from their mothers — are taught by human caregivers and older orangutan "teachers." They learn to climb, identify edible plants, build nests, and interact with other orangutans. Caregivers deliberately limit human contact as the animals mature, to reduce dependence.

**Forest school** takes place in fenced forest areas where orangutans are gradually given more space, less food provisioning, and more time to fend for themselves. The aim is to simulate wild conditions as closely as possible.

**Soft release** involves moving candidates to a release site with minimal human provisioning. Rangers monitor them closely using GPS collars. Some adapt quickly; others struggle and need to be brought back temporarily.

**Post-release monitoring** continues for months or years. Not every orangutan makes it — some return to provisioning stations repeatedly, some do not survive. But the success rate for well-prepared individuals is high.

## The Challenges

Rehabilitation is expensive. A single orangutan can cost tens of thousands of dollars to rehabilitate over five to eight years. Centres are chronically underfunded and depend heavily on international donations.

The bigger problem is the lack of suitable release sites. There is no point releasing rehabilitated orangutans into forest that will be cleared in two years. Securing and protecting release sites — ideally connected to larger forest corridors — is as important as the rehabilitation work itself.

## What Success Looks Like

Success is a healthy adult orangutan living and reproducing in the wild, contributing to a genetically diverse population. It is slow, unglamorous work — but every individual counts in a species this close to the edge.

Centres like those in Tanjung Puting and Bukit Lawang give people a rare chance to see orangutans up close in a semi-wild setting. The experience is humbling. And it is a reminder of exactly what is at stake.`,
    },
    {
      title: 'The Orangutan and the Forest: Why Saving One Saves the Other',
      slug: 'orangutan-forest-why-saving-one-saves-the-other',
      image: 'https://images.unsplash.com/photo-1701289870791-594cf2ce0448?auto=format&fit=crop&w=1200&q=80',
      content: `There is a reason conservationists call the orangutan a "flagship species." Protecting orangutans does not just save one remarkable animal — it preserves an entire ecosystem that millions of other species, and millions of people, depend on.

## The Orangutan as Seed Disperser

Orangutans are among the most important seed dispersers in the forests of Borneo and Sumatra. They consume enormous quantities of fruit — including large-seeded species that few other animals can process — and deposit the seeds, intact and viable, across wide areas of forest as they travel.

Studies in Borneo have estimated that a single orangutan may disperse seeds from hundreds of tree species in a year. Many of these trees are commercial timber species. Without orangutans, the natural regeneration of these forests would be dramatically impaired.

## The Carbon Connection

Borneo's peat swamp forests are among the most carbon-dense ecosystems on Earth. The peat — partially decomposed organic matter accumulated over thousands of years — can be up to 20 metres deep. When it is drained and burned, it releases centuries of stored carbon in a single season.

Protecting orangutan habitat and protecting one of the world's most significant carbon sinks are largely the same action. This creates a compelling argument for climate funding to flow toward forest conservation in Indonesia — an argument that BorneoTan and partner organisations are actively making to international bodies.

## Biodiversity Beyond the Orangutan

Orangutan habitat in Borneo overlaps heavily with the ranges of pygmy elephants, proboscis monkeys, sun bears, clouded leopards, and over 600 species of birds. The Bornean rainforest is one of the oldest and most biodiverse terrestrial ecosystems on the planet — older than the Amazon, with a higher density of endemic species than almost anywhere else on Earth.

When we protect forest for orangutans, we protect all of this.

## The Human Dimension

Forests regulate water cycles. They prevent floods and landslides. They provide food, medicine, and building materials for the indigenous Dayak communities who have lived in and around Borneo's forests for thousands of years.

Deforestation does not just harm wildlife. It increases flood risk in downstream agricultural areas, destroys the livelihoods of communities dependent on forest resources, and displaces indigenous people from land they have stewarded sustainably for generations.

## A Unifying Goal

The orangutan gives conservation a face. It is much easier to mobilise public support for a great ape with expressive eyes and a complex inner life than for a peat swamp. But the outcomes are the same.

When we say we are fighting to save the orangutan, we are also fighting to maintain functioning water cycles, stable climates, intact food webs, viable indigenous cultures, and a planet with something resembling the biodiversity it had before the industrial era.

That is worth fighting for.`,
    },
  ];

  for (const post of posts) {
    await conn.execute(
      `INSERT INTO Blog (title, slug, content, image, published, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 1, NOW(), NOW())
       ON DUPLICATE KEY UPDATE title=title`,
      [post.title, post.slug, post.content, post.image]
    );
  }

  console.log(`Seeded ${posts.length} blog posts.`);
  console.log('Seed complete! Admin: admin@borneotan.org / admin123');
  await conn.end();
}

main().catch(console.error);
