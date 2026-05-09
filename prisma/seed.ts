import "dotenv/config";
import { firestore } from "../src/lib/firebase-admin";
import bcrypt from "bcrypt";

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  const adminRef = firestore.collection("users").doc("default-admin");
  await adminRef.set(
    {
      email: "admin@borneotan.org",
      password: hash,
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  );

  // Seed initial statistics
  const statsData = [
    { label: "Orangutans Remaining", value: "~104,700" },
    { label: "Forest Lost (ha/yr)", value: "1.3M+" },
    { label: "IUCN Status", value: "Critical" },
    { label: "Population Drop (60yr)", value: ">50%" },
  ];

  for (const s of statsData) {
    await firestore
      .collection("statistics")
      .doc(`seed-${statsData.indexOf(s) + 1}`)
      .set(
        {
          ...s,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
  }

  // Seed initial blog posts
  const blogPosts = [
    {
      title: "Understanding Orangutan Intelligence: Tool Use and Social Learning",
      slug: "understanding-orangutan-intelligence-tool-use-social-learning",
      image: "https://images.unsplash.com/photo-1571386195942-dfb9db1e17d9?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Discover how orangutans demonstrate remarkable cognitive abilities, from crafting tools to passing knowledge through generations.",
      content: `
## The Smartest Apes in the Forest

Orangutans have long been recognized as one of the most intelligent primates on Earth. Their cognitive abilities rival those of chimpanzees and gorillas, with some unique adaptations for their largely solitary lifestyle in the rainforest canopy.

### Tool Use in the Wild

Researchers have documented wild orangutans using tools in ways that demonstrate foresight and planning. They:
- Craft sticks to extract honey from bee hives
- Use leafy branches as umbrellas and fans
- Modify twigs to pry open fruits with hard shells
- Create "gloves" from leaves to handle spiny fruits

### Social Learning and Culture

What makes orangutans truly remarkable is their capacity for social learning. Young orangutans spend up to 8 years with their mothers, learning critical survival skills including:
- Identifying 200+ species of edible fruits and plants
- Building waterproof sleeping nests each night
- Navigating complex forest territories
- Recognizing predator warning calls

Different orangutan populations have developed distinct "cultures" - unique tool-use techniques and feeding habits that are passed down through generations.

### Problem-Solving Abilities

In captivity, orangutans have demonstrated:
- Using computers with touch screens
- Learning sign language vocabulary of over 100 words
- Solving complex multitool puzzles
- Displaying empathy and cooperation with caretakers

These cognitive abilities make the loss of each individual orangutan not just a genetic loss, but a cultural one. When an orangutan dies, generations of accumulated knowledge disappear with it.

## Conservation Implications

Understanding orangutan intelligence strengthens the ethical case for their protection. These are not merely animals, but sentient beings with culture, memory, and individual personalities. Protecting their remaining habitat preserves not just trees, but 8 million years of evolutionary wisdom.
      `,
    },
    {
      title: "How Climate Change Affects Orangutan Habitats and Food Sources",
      slug: "how-climate-change-affects-orangutan-habitats-food-sources",
      image: "https://images.unsplash.com/photo-1727100828954-8759b3e98d21?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Climate change intensifies threats to orangutans through fruit scarcity, forest fires, and shrinking habitats.",
      content: `
## The Hidden Threat of Climate Change

While deforestation grabs headlines, climate change silently compounds every threat facing orangutans. Rising temperatures, unpredictable rainfall, and extreme weather events are reshaping Borneo and Sumatra's rainforests faster than orangutans can adapt.

### Fruit Availability Crisis

Orangutans are frugivores - 60% of their diet depends on fruit, especially durians and figs. Climate change disrupts:
- **Flowering and fruiting cycles** - Unpredictable seasons mean trees fruit irregularly
- **Masting events** - Synchronized mass fruiting (which occurs every 2-10 years) is becoming erratic
- **Fruit nutrition** - Higher CO2 levels reduce protein and mineral content

When fruits are scarce, orangutans enter energy-saving mode, moving less and eating lower-quality bark and leaves. Extended lean periods lead to malnutrition, delayed reproduction, and increased mortality.

### Forest Fires Intensify

Droughts linked to El Niño events are becoming more severe and frequent. Combined with drainage of peatlands for plantations, this creates perfect conditions for catastrophic fires:
- 2015 fires burned 2.6 million hectares
- Over 100,000 orangutans were killed or displaced
- Smoke haze causes respiratory illnesses
- Fires destroy fruit trees that take decades to replace

### Rising Sea Levels

Low-lying coastal forests, which provide critical habitat for orangutans, face inundation from sea-level rise. Some populations in eastern Borneo have already lost 15% of their lowland habitat to saltwater intrusion, which kills freshwater trees.

### Heat Stress

Orangutans rarely descend to the forest floor, relying on the forest canopy for shade and cooling. As temperatures rise:
- They spend more energy seeking water
- Nest-building behavior changes
- Infants are more vulnerable to heat exhaustion

## What Can Be Done?

Climate resilience for orangutans requires:
1. Protecting large, connected forest corridors that allow range shifts
2. Restoring degraded peatlands to prevent fires
3. Replanting diverse fruit trees (not just fast-growing species)
4. Reducing global carbon emissions through policy advocacy

Every fraction of a degree of warming matters for species already on the edge of extinction.
      `,
    },
    {
      title: "Top 5 Orangutan Conservation Organizations You Can Support Today",
      slug: "top-5-orangutan-conservation-organizations-support-today",
      image: "https://images.unsplash.com/photo-1645430785800-d7d0daac9c5c?auto=format&fit=crop&w=1200&q=80",
      excerpt: "These verified conservation groups are making real progress in protecting orangutans and their rainforest homes.",
      content: `
## Where Your Donation Makes the Biggest Impact

With so many conservation organizations asking for support, it can be hard to know which ones are truly effective. Here are five verified organizations with proven track records in orangutan protection.

### 1. Borneo Orangutan Survival (BOS) Foundation
**The Rehabilitation Experts**
- **Founded:** 1991
- **Impact:** Rescued over 1,000 orangutans, released 500+ back to wild
- **How they work:** Rescues displaced orangutans from palm oil plantations and captivity, rehabilitates them in forest schools, releases into protected forests
- **Transparency:** 82% of donations go directly to programs
- **Support:** Adopt an orangutan, sponsor a release, or donate to forest patrols

### 2. Orangutan Foundation International (OFI)
**The Research Pioneers**  
- **Founded:** 1986 by Dr. Biruté Galdikas (one of Leakey's "Trimates" along with Jane Goodall)
- **Impact:** Protected 20,000 hectares, studied orangutans for 50+ years
- **How they work:** Long-term research, habitat protection, education programs, rescue and rehabilitation
- **Key program:** The Care Center and Quarantine facility treats sick and injured wild orangutans
- **Support:** Monthly giving program, sponsor a guard post, OFI scholarship fund

### 3. Sumatran Orangutan Conservation Programme (SOCP)
**The Habitat Protectors**
- **Founded:** 1999
- **Impact:** Created 1,400km² of protected corridor, reintroduced 350+ orangutans
- **How they work:** Focuses on Sumatra's critically endangered species (only 13,000 remain)
- **Unique approach:** Uses geospatial mapping to identify priority forest corridors
- **Support:** Tree planting programs, adopt a reintroduction site, support human-wildlife conflict teams

### 4. The Orangutan Project
**Policy and Advocacy Leaders**
- **Founded:** 1998
- **Impact:** Helped establish 3 national parks, influenced EU palm oil policies
- **How they work:** Combines on-ground conservation with political advocacy
- **Achievements:** Pushed for sustainable palm oil certification, supported anti-wildlife trade laws
- **Support:** Join their advocacy network, sponsor an anti-poaching unit, support women-led conservation programs

### 5. Rainforest Trust
**Land Purchase Specialists**
- **Founded:** 1988
- **Impact:** Protected 23 million acres of habitat for orangutans and other species
- **How they work:** Purchases land to create protected areas and national parks
- **Efficiency:** 99% of funds go to conservation (foundation covers operating costs)
- **Current project:** Creating the 452,000-acre Gunung Panti Rainforest Corridor in Borneo
- **Support:** One-time donations, legacy giving, corporate partnerships

## Before You Donate

Look for organizations that:
- Publish annual reports with financial transparency
- Have local staff (not just Western headquarters)
- Support community-based conservation
- Work with government partners
- Measure and report outcomes (not just activities)

**Red flags to avoid:**
- No clear conservation strategy
- Morbid imagery or guilt-based appeals
- Vague claims about "awareness campaigns"
- Most money spent on advertising

Every dollar wisely donated brings orangutans one step closer to survival. Choose one organization and give consistently rather than spreading tiny amounts across many groups.
      `,
    },
    {
      title: "The Devastating Impact of Palm Oil: Beyond the Headlines",
      slug: "devastating-impact-palm-oil-beyond-headlines",
      image: "https://images.unsplash.com/photo-1623829604482-5723c9a2f7d4?auto=format&fit=crop&w=1200&q=80",
      excerpt: "The true cost of palm oil goes beyond orangutans, affecting biodiversity, local communities, and global climate stability.",
      content: `
## The Hidden Costs of Your Favorite Products

Palm oil is in 50% of supermarket products - from pizza to shampoo. But the industrial-scale monoculture required to produce it comes with devastating consequences that extend far beyond orangutan habitat loss.

### Biodiversity Collapse

When rainforest is converted to palm oil plantation, biodiversity drops by 90%:
- **Bird species** - From 200+ species to just 15-20
- **Mammals** - Sun bears, clouded leopards, pygmy elephants vanish
- **Insects** - Critical pollinators and decomposers disappear
- **Soil health** - Fungal networks and microorganisms die off

Unlike selectively logged forests, palm plantations are green deserts - they look like forests but support virtually no wildlife.

### Carbon Emissions Catastrophe

Borneo's peatlands store 20 years' worth of Indonesia's fossil fuel emissions. Draining them for plantations releases:
- 3x more CO2 than clearing mineral soils
- Methane from drainage ditches
- Peat fires that burn for months

The 2015 fires alone emitted more daily CO2 than the entire US economy.

### Social Justice Crisis

Indigenous Dayak and Penan communities face:
- Land grabs without consent or compensation
- Water pollution from fertilizer runoff
- Respiratory illness from plantation fires
- Loss of traditional food sources and medicine
- Economic dependency on low-wage plantation work

## What "Sustainable Palm Oil" Really Means

The Roundtable on Sustainable Palm Oil (RSPO) certification has loopholes:
- Allows recent deforestation if biodiversity is considered "low value"
- No requirement to restore degraded lands
- Weak enforcement - 20% of "certified" oil isn't actually certified

Truly ethical alternatives:
- Certified organic coconut oil
- Shea butter
- Smallholder cooperatives (not corporations)

## Action Steps for Consumers

1. **Read labels** - Avoid products with "palm oil" or just "vegetable oil" (often palm)
2. **Use apps** - Palm Oil Scan and Orangutan Alliance app identify palm-free products
3. **Target the worst offenders** - Avoid Mondelez (Oreos), Nestlé, Unilever products
4. **Support brands** - Choose companies with deforestation-free policies and third-party audits
5. **Reduce overall consumption** - Processed foods with palm oil aren't healthy anyway

The best solution? Demand supply chain transparency and government regulation. Consumer pressure alone won't fix this, but it's a powerful start.
      `,
    },
    {
      title: "Volunteering in Borneo: What to Expect at Orangutan Sanctuaries",
      slug: "volunteering-borneo-orangutan-sanctuaries-guide",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac0ce839?auto=format&fit=crop&w=1200&q=80",
      excerpt: "A realistic guide to sanctuary volunteering - the rewards, challenges, and how to avoid unethical programs.",
      content: `
## Reality Check: It's Not a Vacation

Volunteering in an orangutan sanctuary sounds like a dream - working close with these incredible apes while helping save a species. The reality is both more challenging and more rewarding than Instagram photos suggest.

### What Ethical Sanctuaries Actually Have You Do

**Daily tasks will likely include:**
- Slicing 200 kg of fruit daily (knife skills required!)
- Hiking 10-15 km through muddy forest to deliver food platforms
- Washing dozens of blankets and sleeping mats
- Building and repairing climbing structures
- Recording behavioral data for hours
- Cleaning enclosures (yes, that includes poop)
- Preparing "forest school" enrichment activities

**What you won't do:**
- Touch, hold, or play with orangutans (stressful for them, dangerous for you)
- Feed babies directly (rehabilitation requires minimizing human contact)
- Enter enclosures with adult orangutans (they're 5x stronger than humans)

### Red Flags to Avoid

**Unethical programs often offer:**
- "Cuddling baby orangutans" (they should be with mothers, not tourists)
- Short programs (less than 2 weeks - waste of training resources)
- Orangutans in unnatural photoshoots
- No quarantine or veterinary facilities visible
- Unclear separation between tourists and rehabilitation areas

### Legitimate Organizations to Contact

These programs have ethical, educational volunteer experiences:

1. **BOS Foundation - Samboja Lestari (East Kalimantan)**
   - Minimum 4 weeks, maximum 6 months
   - Cost covers food and accommodation ($2,000-5,000)
   - Focus: Forest school monitoring, food distribution

2. **Sepilok Orangutan Rehabilitation Centre (Sabah, Malaysia)**
   - Under Malaysian government, limited volunteer slots
   - Must apply 6-12 months in advance
   - Focus: Platform feeding, tourist management, data collection

3. **Orangutan Kutai Project (East Kalimantan)**
   - Reintroduction site monitoring
   - Requires prior biology/ecology experience
   - More scientific focus than most programs

### Practical Realities

**Physical demands:**
- Heat and humidity (85-95°F, 80%+ humidity)
- Leeches (hundreds of them - you learn to accept it)
- Basic accommodation (shared rooms, bucket showers, mosquitoes)
- Medical risks (protect against malaria, typhoid, rabies)

**Personal growth:**
- You'll become incredibly fit
- You'll learn patience and observation skills
- You'll develop deep friendships with fellow volunteers
- You'll gain perspective on global inequality and conservation challenges

### Making an Impact Beyond Volunteering

If you can't travel to Borneo, you can still have impact:
- Fund a local person's training ($500 trains a ranger)
- Support salary for forest guardians ($100/month protects 1,000 hectares)
- Donate equipment (GPS units, camera traps, binoculars)
- Volunteer with local think tanks (remote research assistance)

The most valuable help is often the least glamorous - don't be seduced by "once in a lifetime" experiences that prioritize your photos over animal welfare.
      `,
    },
  ];

  for (const post of blogPosts) {
    const existing = await firestore
      .collection("blogs")
      .where("slug", "==", post.slug)
      .limit(1)
      .get();

    if (!existing.empty) {
      console.log(`Skipping existing post: ${post.slug}`);
      continue;
    }

    await firestore.collection("blogs").add({
      ...post,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    console.log(`Added blog post: ${post.title}`);
  }

  console.log("\n✅ Seed complete!");
  console.log("Admin login: admin@borneotan.org / admin123");
  console.log(`Added ${blogPosts.length} blog posts about orangutan conservation`);
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});