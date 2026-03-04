// =============================================
//  THE BEASTRO — Pet Data
// =============================================

const PETS = [
  {
    id: "tortie",
    name: "Tortie",
    owner: "Mackenzie",
    species: "cat",
    emoji: "🐱",
    color: "#C9B8F0", // lavender
    traits: ["feral (in spirit)", "trot-obsessed", "secret cuddler"],
    bio: "Found at a gas station and technically 'feral,' Tortie has chosen violence against Twizzlers and chosen love against everyone's expectations. Trots around the house like she's very busy. Demands to be kissed on the head — and she will not take no for an answer.",
    creation: {
      name: "The Gas Station Find",
      description: "A spicy-sweet tortilla wrap with surprise fillings — you never know exactly what's inside until you're already committed. Tied with a red candy-stripe ribbon and served with a side of unexpected warmth."
    }
  },
  {
    id: "olive",
    name: "Olive",
    owner: "Mackenzie",
    species: "cat",
    emoji: "🫒",
    color: "#A8E6CF", // mint
    traits: ["loyal to one human", "vocal", "secretly a cuddle bug"],
    bio: "Black cat. Green eyes. Double olive situation. Tortie's sibling, though she'd prefer you not mention it. Olive has claimed one human as her entire world and meows about it constantly. Will cuddle — but only when no one is watching.",
    creation: {
      name: "The Double Olive Martini",
      description: "A classic dirty martini, served warm (she likes warm places), garnished with exactly two green olives. Comes with a tiny handwritten card that says 'do not disturb.' Pairs best with absolute silence and one specific person nearby."
    }
  },
  {
    id: "luna",
    name: "Luna",
    owner: "Matt",
    species: "cat",
    emoji: "🌙",
    color: "#FFE066", // yellow
    traits: ["keyboard devotee", "punctual", "Siamese"],
    bio: "A Siamese who has discovered that lying directly on a keyboard produces results. She is promptly fed when the feeder goes off, and she responds to this feeder with great enthusiasm. She has trained her human very effectively.",
    creation: {
      name: "The Keyboard Napper",
      description: "A charcuterie board arranged in the unmistakable shape of a keyboard, served the exact moment the bell rings — not before, not after. The chef will not wait. Luna wouldn't."
    }
  },
  {
    id: "violet",
    name: "Violet",
    owner: "Geoff",
    species: "cat",
    emoji: "💜",
    color: "#EDE6FF", // lavender light
    traits: ["Texas transplant", "emerging from her shell", "long-haired"],
    bio: "A long-haired grey cat who made the big move from Texas and is slowly, cautiously deciding that maybe this is fine. Doesn't hide as much as she used to. Has also become quite the snuggle bug at bedtime — she crams herself between her humans and will lean right into them if they dare move away. Occasionally gets hairballs. Texas does that to people.",
    creation: {
      name: "The Texas Transplant",
      description: "A lavender-grey cotton candy cloud served over a warm honey biscuit. No hiding under the plate. Slightly more relaxed than it used to be. Dusted with a touch of something that could be described as 'not hairball, but close.'"
    }
  },
  {
    id: "indy",
    name: "Indy",
    owner: "Mike",
    species: "dog",
    emoji: "🏔️",
    color: "#A8E6CF", // mint
    traits: ["Colorado local", "hiker", "adventure dog"],
    bio: "A corgi living his absolute best life in Colorado. Indy goes on hikes. Indy goes on more hikes. Then more hikes. Then probably another hike. He is built low to the ground but his spirit reaches the peaks.",
    creation: {
      name: "The Summit Trail Mix",
      description: "A hearty Colorado-inspired granola bowl with dried cherries, dark chocolate chips, and toasted oats — served in a miniature hiking boot-shaped dish with an edible elevation map drizzled in honey on top."
    }
  },
  {
    id: "koda",
    name: "Koda",
    owner: "Bruce",
    species: "dog",
    emoji: "✈️",
    color: "#FFB347", // peach
    traits: ["world traveler", "background napper", "mini Aussie"],
    bio: "A mini Australian Shepherd who has seen more of the world than most humans. Travels with his human dad and can reliably be found napping in the background of AI Roundtables. He is unbothered. He is content. He is probably asleep right now.",
    creation: {
      name: "The Background Napper",
      description: "A travel-sized charcuterie board designed to fit in a carry-on — tiny cheeses, tiny crackers, tiny cornichons. Garnished with a small fondant dog, eyes closed, clearly napping. Best enjoyed while someone else is talking about AI."
    }
  },
  {
    id: "lemon",
    name: "Lemon",
    owner: "Savannah",
    species: "cat",
    emoji: "🍋",
    color: "#FFE066", // yellow
    traits: ["nosy", "distinctive face", "in everyone's business"],
    bio: "A black and white cat with a very distinct facial marking and an absolute refusal to mind her own business. If something is happening, Lemon is there. If something is not happening, Lemon is there anyway.",
    creation: {
      name: "The Nose Art Tart",
      description: "A classic lemon tart with a distinctive black-and-white marbled glaze on top — the pattern is different every time, but always immediately recognizable. Served with the confidence of a cat who knows exactly what you're doing."
    }
  },
  {
    id: "kevin",
    name: "Kevin",
    owner: "Savannah",
    species: "dog",
    emoji: "🐕",
    color: "#FFE8E4", // coral light
    traits: ["golden retriever", "eyes always closed", "blissful"],
    bio: "A golden retriever who keeps his eyes closed in all photos. Every single one. Not blinking — eyes closed. Kevin has found inner peace and we should all take a moment to reflect on that.",
    creation: {
      name: "Eyes Closed Bliss",
      description: "A rich golden caramel custard, impossibly smooth, best enjoyed without looking at it. The chef recommends closing your eyes for the first bite. Kevin would insist."
    }
  },
  {
    id: "gibson",
    name: "Gibson",
    owner: "Jena",
    species: "dog",
    emoji: "🐸",
    color: "#A8E6CF", // mint
    traits: ["frog dog", "show-and-tell enthusiast", "dental hygiene icon"],
    bio: "A pitbull of great personality. Brings a toy to show you every single time you come home. Masters the 'sploot' (we call it 'frog dog'). Brushes his teeth every day with one of his hard toys. Gets absolutely terrified when a human sneezes. Please sneeze quietly near Gibson.",
    creation: {
      name: "The Frog Dog",
      description: "A cream puff shaped like a splayed frog — legs out, flat on the plate, fully committed. Served with a toothbrush-shaped butter cookie on the side. Labeled with a small tent card: 'Please do not sneeze near this dish.' The chef means it."
    }
  },
  {
    id: "kitkat",
    name: "KitKat",
    owner: "Courtney",
    species: "cat",
    emoji: "🦇",
    color: "#C9B8F0", // lavender
    traits: ["BatCat", "food thief", "motor-purrer"],
    bio: "Sweet. Meows very quietly. And yet: the naughtiest baby. Cuts in front of Jellybean every chance she gets. Takes Jellybean's food — every chance she gets. Purrs like a motor. Wears a natural mask over her eyes, earning the nicknames BatCat, MitMat, and BitBat. Recently acquired two dog siblings who are, reportedly, terrified of her.",
    creation: {
      name: "The BatCat Sundae",
      description: "A black-and-white ice cream sundae topped with a fondant mask, served in two sizes — yours arrives first, before Jellybean's. Purrs faintly when you stir it. Dogs at neighboring tables have asked to be moved. We cannot accommodate that request."
    }
  },
  {
    id: "dozer",
    name: "Dozer",
    owner: "Kaycie",
    species: "tortoise",
    emoji: "🐢",
    color: "#A8D5BA", // sage green
    traits: ["dramatic hisser", "furniture rearanger", "sleepy"],
    bio: "A tortoise with strong opinions about interior design and an even stronger hiss. When scared, he emits a sound like a massive tire losing air, followed by a shell thump that shakes the ground. Spends most of his time sleeping, but when awake, he charges into furniture with the determination of a tiny bulldozer. His favorite snacks are mustard greens, bell peppers, and apples.",
    creation: {
      name: "The Furniture Rearrangement",
      description: "A deconstructed salad served on a plate that's been rearranged three times during plating — mustard greens, bell pepper strips, and apple slices scattered artfully (chaotically). Comes with a small ceramic tortoise figurine that tips over dramatically when you touch the plate. Pairs well with a dramatic hiss of approval."
    }
  },
  {
    id: "lula",
    name: "Lula",
    owner: "Erin",
    species: "dog",
    emoji: "🐕",
    color: "#8B4513", // saddle brown
    traits: ["Rottweiler", "selective eater", "feather-phobic"],
    bio: "A 135 lb Rottweiler with a surprisingly refined palate. Gets along swimmingly with cats and goats, but has strong opinions about other animals. Will happily devour garbage and poop, but draws a firm line at eggs and shellfish — absolutely not happening. Her one true fear? Feathers. The mere sight sends her into a panic.",
    creation: {
      name: "The Selective Feast",
      description: "A deconstructed charcuterie board featuring garbage-inspired delicacies and artfully arranged poop-shaped chocolates, conspicuously missing any eggs or shellfish. Garnished with cat and goat figurines for moral support. Served on a plate with a protective dome to shield from any stray feathers. A small fondant Rottweiler guards the perimeter with dignified intensity."
    }
  }
];
