"use strict";
const artists = [
  {
    name: "Pinkfong",
    genre: "Children's music",
    total: "11:31",
    photo: "images/pinkfong.jpeg",
    blurb:
      "The children's music powerhouse behind the most-watched video on the internet. Short, loud, unbelievably sticky.",
    songs: [
      { title: "Baby Shark", duration: "2:16", cover: "images/pinkfong.jpeg" },
      {
        title: "Wheels on the Bus",
        duration: "2:35",
        cover: "images/pinkfong.jpeg",
      },
      {
        title: "Five Little Monkeys",
        duration: "2:05",
        cover: "images/pinkfong.jpeg",
      },
      {
        title: "Monkey Banana",
        duration: "2:24",
        cover: "images/pinkfong.jpeg",
      },
      {
        title: "Shark Family",
        duration: "2:11",
        cover: "images/pinkfong.jpeg",
      },
    ],
  },
  {
    name: "Adriano Celentano",
    genre: "Italian pop",
    total: "20:52",
    photo: "images/adriano-celentano.jpg",
    blurb:
      "Sixty years of Italian pop in one voice: rock and roll imported, rewritten and sung back louder.",
    songs: [
      {
        title: "Azzurro",
        duration: "3:41",
        cover: "images/adriano-celentano.jpg",
      },
      {
        title: "L'emozione non ha voce",
        duration: "4:13",
        cover: "images/adriano-celentano.jpg",
      },
      {
        title: "Il ragazzo della via Gluck",
        duration: "4:16",
        cover: "images/adriano-celentano.jpg",
      },
      {
        title: "Susanna",
        duration: "4:26",
        cover: "images/adriano-celentano.jpg",
      },
      {
        title: "Confessa",
        duration: "4:16",
        cover: "images/adriano-celentano.jpg",
      },
    ],
  },
  {
    name: "Asake",
    genre: "Afrobeats",
    total: "14:08",
    photo: "images/asake.jpg",
    blurb:
      "Amapiano log drums, fuji chants and street-Yoruba hooks. The loudest new voice out of Lagos.",
    songs: [
      { title: "Sungba", duration: "2:47", cover: "images/asake-ololade.jpg" },
      {
        title: "Joha",
        duration: "2:35",
        cover: "images/asake-mr-money-with-the-vibe.jpg",
      },
      { title: "Jogodo", duration: "3:08", cover: "images/asake-real.jpg" },
      {
        title: "Amapiano",
        duration: "3:22",
        cover: "images/asake-work-of-art.jpg",
      },
      {
        title: "Lonely At The Top",
        duration: "2:16",
        cover: "images/asake-work-of-art.jpg",
      },
    ],
  },
  {
    name: "Miyagi and Andy Panda",
    genre: "Hip-hop",
    total: "16:21",
    photo: "images/miyagi-and-andy-panda.jpg",
    blurb:
      "Two rappers from Vladikavkaz, half sung and half spoken, built on dub basslines and long reverbs.",
    songs: [
      {
        title: "Kosandra",
        duration: "3:18",
        cover: "images/miyagi-kosandra.jpg",
      },
      {
        title: "Utopia",
        duration: "3:00",
        cover: "images/miyagi-yamakasi.jpg",
      },
      { title: "Minor", duration: "3:13", cover: "images/miyagi-yamakasi.jpg" },
      { title: "Saloon", duration: "2:46", cover: "images/miyagi-saloon.jpg" },
      {
        title: "I Got Love",
        duration: "4:04",
        cover: "images/miyagi-i-got-love.jpg",
      },
    ],
  },
  {
    name: "Johnny Cash",
    genre: "Country",
    total: "15:40",
    photo: "images/johnny-cash.jpg",
    blurb:
      "The man in black. Three chords, the truth, and a baritone that outlasted every genre it was filed under.",
    songs: [
      { title: "Hurt", duration: "3:36", cover: "images/johnny-cash.jpg" },
      {
        title: "Ring of Fire",
        duration: "2:38",
        cover: "images/johnny-cash.jpg",
      },
      {
        title: "Highwayman",
        duration: "3:03",
        cover: "images/johnny-cash.jpg",
      },
      {
        title: "God's Gonna Cut You Down",
        duration: "2:38",
        cover: "images/johnny-cash.jpg",
      },
      {
        title: "Ghost Riders in the Sky",
        duration: "3:45",
        cover: "images/johnny-cash.jpg",
      },
    ],
  },
];

console.log(artists);
fetch("./artists.json")
  .then((response) => response.json())
  .then((artists) => {
    renderCards(artists);
  });
