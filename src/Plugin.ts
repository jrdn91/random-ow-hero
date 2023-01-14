import { Streamdeck } from '@rweich/streamdeck-ts';

const plugin = new Streamdeck().plugin();

type Hero = {
  key: string;
  name: string;
  portrait: string;
  role: 'tank' | 'dps' | 'support';
};

let heroArray: Hero[] = [];
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
export default plugin;
