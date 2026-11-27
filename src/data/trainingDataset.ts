export interface SyntheticReviewRecord {
  id: string;
  review: string;
  sentiment: 'positive' | 'neutral';
  category: string;
  synthetic: boolean;
}

export interface TrainingDataset {
  dataset_name: string;
  version: string;
  language: string;
  record_count: number;
  notice: string;
  labels: {
    sentiment: string[];
    category: string[];
  };
  reviews: SyntheticReviewRecord[];
}

export const SYNTHETIC_REVIEWS_DATASET: TrainingDataset = {
  dataset_name: "Modern Electronics - Synthetic Review Examples",
  version: "1.1",
  language: "en",
  record_count: 38,
  notice: "All records are fictional synthetic examples created for AI training and testing. They are not verified customer testimonials.",
  labels: {
    sentiment: ["positive", "neutral"],
    category: [
      "refrigerator",
      "washing_machine",
      "smartphone",
      "air_conditioner",
      "television",
      "cooler",
      "ceiling_fan",
      "microwave",
      "water_purifier",
      "general",
      "speakers"
    ]
  },
  reviews: [
    {
      id: "ME-001",
      review: "Bought a refrigerator from Modern Electronics. The staff explained the features clearly and helped me compare a couple of models. Delivery was on the day they promised.",
      sentiment: "positive",
      category: "refrigerator",
      synthetic: true
    },
    {
      id: "ME-002",
      review: "Good experience. I went in for a washing machine and got proper information about the capacity and wash programs. The price was reasonable too.",
      sentiment: "positive",
      category: "washing_machine",
      synthetic: true
    },
    {
      id: "ME-003",
      review: "Purchased a Redmi phone here. They showed me the available options without rushing me. Happy with the phone so far.",
      sentiment: "positive",
      category: "smartphone",
      synthetic: true
    },
    {
      id: "ME-004",
      review: "Got an AC from the shop before summer. They explained the different options and answered all my questions. Overall, a smooth purchase.",
      sentiment: "positive",
      category: "air_conditioner",
      synthetic: true
    },
    {
      id: "ME-005",
      review: "We bought an LED TV for our home. The staff helped us choose the right screen size. Picture quality is good and the buying process was easy.",
      sentiment: "positive",
      category: "television",
      synthetic: true
    },
    {
      id: "ME-006",
      review: "Needed a cooler quickly and found a suitable one here. Staff were helpful and explained how to maintain it. Nice service.",
      sentiment: "positive",
      category: "cooler",
      synthetic: true
    },
    {
      id: "ME-007",
      review: "Bought two fans for the house. There were a few options in our budget and the staff helped us decide. Satisfied with the purchase.",
      sentiment: "positive",
      category: "ceiling_fan",
      synthetic: true
    },
    {
      id: "ME-008",
      review: "I was looking for a basic microwave, not anything too fancy. They understood what I needed and suggested a suitable model.",
      sentiment: "positive",
      category: "microwave",
      synthetic: true
    },
    {
      id: "ME-009",
      review: "Purchased a water purifier after discussing the features with the staff. They explained the filter details in simple language. Good experience.",
      sentiment: "positive",
      category: "water_purifier",
      synthetic: true
    },
    {
      id: "ME-010",
      review: "Visited Modern Electronics to check prices and ended up buying an appliance. Staff were polite and gave me time to decide. Would visit again.",
      sentiment: "positive",
      category: "general",
      synthetic: true
    },
    {
      id: "ME-011",
      review: "The refrigerator was delivered as discussed. The shop kept me informed and the product arrived in good condition. Thanks for the help.",
      sentiment: "positive",
      category: "refrigerator",
      synthetic: true
    },
    {
      id: "ME-012",
      review: "Helpful people and a decent range of washing machines. They explained the difference between top load and front load models, which made the choice easier.",
      sentiment: "positive",
      category: "washing_machine",
      synthetic: true
    },
    {
      id: "ME-013",
      review: "Got a new phone from here. Billing was quick and they helped with the basic setup. No complaints so far.",
      sentiment: "positive",
      category: "smartphone",
      synthetic: true
    },
    {
      id: "ME-014",
      review: "Good pricing compared with the options I had checked. The staff explained the capacity needed for my room instead of just pushing an expensive model.",
      sentiment: "positive",
      category: "air_conditioner",
      synthetic: true
    },
    {
      id: "ME-015",
      review: "Bought a TV for my parents. They wanted something simple to use, and the staff suggested a model that suited them. Happy with the service.",
      sentiment: "positive",
      category: "television",
      synthetic: true
    },
    {
      id: "ME-016",
      review: "I have visited a few times to check different products. The staff are patient and answer questions properly. A useful local electronics store.",
      sentiment: "positive",
      category: "general",
      synthetic: true
    },
    {
      id: "ME-017",
      review: "Good collection of coolers in different sizes. We found one that fit our room and budget. The purchase was straightforward.",
      sentiment: "positive",
      category: "cooler",
      synthetic: true
    },
    {
      id: "ME-018",
      review: "The person attending us explained the basic functions and warranty. It was a quick and pleasant shopping experience.",
      sentiment: "positive",
      category: "microwave",
      synthetic: true
    },
    {
      id: "ME-019",
      review: "Needed a replacement fan and got one from Modern Electronics. They had options at different prices. Staff behaviour was good.",
      sentiment: "positive",
      category: "ceiling_fan",
      synthetic: true
    },
    {
      id: "ME-020",
      review: "The staff took time to explain the purifier's features and maintenance. I appreciated that they didn't make the decision confusing.",
      sentiment: "positive",
      category: "water_purifier",
      synthetic: true
    },
    {
      id: "ME-021",
      review: "Visited to compare refrigerator models. There were a few choices, but I wanted to check some other stores before deciding. Staff answered my questions.",
      sentiment: "neutral",
      category: "refrigerator",
      synthetic: true
    },
    {
      id: "ME-022",
      review: "The store had the type of washing machine I was looking for. I am still comparing prices, but the information provided was useful.",
      sentiment: "neutral",
      category: "washing_machine",
      synthetic: true
    },
    {
      id: "ME-023",
      review: "Checked a couple of Redmi models here. The staff explained the differences. I haven't purchased yet, but the visit was fine.",
      sentiment: "neutral",
      category: "smartphone",
      synthetic: true
    },
    {
      id: "ME-024",
      review: "Went to ask about AC installation and available models. Got the basic details. I need to confirm a few things before buying.",
      sentiment: "neutral",
      category: "air_conditioner",
      synthetic: true
    },
    {
      id: "ME-025",
      review: "Looked at different TV sizes. The options were okay, although I was hoping to see a few more models. Staff were polite.",
      sentiment: "neutral",
      category: "television",
      synthetic: true
    },
    {
      id: "ME-026",
      review: "I visited for a cooler and got to see some options. Prices were within the range I expected. Still deciding which one to buy.",
      sentiment: "neutral",
      category: "cooler",
      synthetic: true
    },
    {
      id: "ME-027",
      review: "The shop is easy to visit and has several electronics items. My questions were answered, though I did not make a purchase that day.",
      sentiment: "neutral",
      category: "general",
      synthetic: true
    },
    {
      id: "ME-028",
      review: "Asked about microwave capacity and functions. Got the information I needed. I may come back after discussing it at home.",
      sentiment: "neutral",
      category: "microwave",
      synthetic: true
    },
    {
      id: "ME-029",
      review: "Went in looking for a fan. They showed me a few models, but the exact finish I wanted was not available during my visit.",
      sentiment: "neutral",
      category: "ceiling_fan",
      synthetic: true
    },
    {
      id: "ME-030",
      review: "Asked about service and filter replacement costs for a purifier. The staff gave me some details, and I will compare before making a decision.",
      sentiment: "neutral",
      category: "water_purifier",
      synthetic: true
    },
    {
      id: "ME-031",
      review: "We needed a fridge for a new home and got useful suggestions based on our family size. The staff kept the discussion simple and practical.",
      sentiment: "positive",
      category: "refrigerator",
      synthetic: true
    },
    {
      id: "ME-032",
      review: "Went in just to see phones, but the staff helped me compare storage and camera options. I chose one that fit my needs.",
      sentiment: "positive",
      category: "smartphone",
      synthetic: true
    },
    {
      id: "ME-033",
      review: "The staff explained how much capacity would be enough for our family. That was more helpful than just looking at the price tags.",
      sentiment: "positive",
      category: "washing_machine",
      synthetic: true
    },
    {
      id: "ME-034",
      review: "Got a quotation for an AC and asked about the installation process. The details were helpful, but I am waiting to finalize my room measurements.",
      sentiment: "neutral",
      category: "air_conditioner",
      synthetic: true
    },
    {
      id: "ME-035",
      review: "The staff showed us a few smart TV features. It was a decent visit, and we are planning to return with the family.",
      sentiment: "neutral",
      category: "television",
      synthetic: true
    },
    {
      id: "ME-036",
      review: "I visited during a busy time and could not get much assistance. Maybe it would be better to visit when the store is less crowded.",
      sentiment: "neutral",
      category: "general",
      synthetic: true
    },
    {
      id: "ME-037",
      review: "Bought a cooler for one room. It does the job we needed, and the staff helped us choose a size that would fit the space.",
      sentiment: "positive",
      category: "cooler",
      synthetic: true
    },
    {
      id: "ME-038",
      review: "Asked about exchange options for my old phone. I got some initial information, but I need to check the final terms.",
      sentiment: "neutral",
      category: "smartphone",
      synthetic: true
    }
  ]
};
