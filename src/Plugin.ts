import { Streamdeck } from '@rweich/streamdeck-ts';

import GetBase64FromUrl from './utils/GetBase64FromUrl';
import GetRandomArrayElement from './utils/GetRandomArrayElement';

const plugin = new Streamdeck().plugin();

type Hero = {
  key: string;
  name: string;
  portrait: string;
  role: 'tank' | 'dps' | 'support';
};

let heroArray: Hero[] = [];

let currentHeroId: string | undefined;

// your code here..
plugin.on('willAppear', ({ context }) => {
  plugin.setTitle('test', context);
});

plugin.on('didReceiveSettings', async () => {
  const heroResponse = await fetch('https://overfast-api.tekrop.fr/heroes');
  if (heroResponse.ok) {
    const heroes = await heroResponse.json();
    heroArray = heroes;
  }
});

plugin.on('keyUp', async ({ context }) => {
  // filters out the current hero from the array
  const filteredHeroArray = heroArray.filter((hero) => hero.key !== currentHeroId);
  const newRandomHero = GetRandomArrayElement(filteredHeroArray);
  currentHeroId = newRandomHero.key;
  try {
    const heroBase64Image = await GetBase64FromUrl(newRandomHero.portrait);
    if (typeof heroBase64Image === 'string') {
      plugin.setImage(heroBase64Image, context);
    }
  } catch (error) {
    console.error(error);
  }
});

export default plugin;
