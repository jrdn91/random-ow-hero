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
fetch('https://overfast-api.tekrop.fr/heroes')
  .then(async (response) => {
    if (response.ok) {
      const heroes = await response.json();
      heroArray = heroes;
      return heroes;
    }
    throw new Error('Error while fetching heroes');
  })
  .catch((error) => {
    console.error(error);
  });

plugin.on('willAppear', async ({ context, action }) => {
  plugin.setTitle(action, context);
});

plugin.on('keyUp', async ({ context, ...rest }) => {
  console.log('rest', rest);
  // filters out the current hero from the array
  const heroArrayWithoutCurrentHero = heroArray.filter((hero) => hero.key !== currentHeroId);
  const newRandomHero = GetRandomArrayElement(heroArrayWithoutCurrentHero);
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
